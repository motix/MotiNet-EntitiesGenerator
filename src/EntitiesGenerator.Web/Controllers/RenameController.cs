using EntitiesGenerator.Web.ViewModels.Refactoring.Rename;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace EntitiesGenerator.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RenameController : ControllerBase
    {
        [HttpPost("check-path")]
        public ActionResult<object> CheckPath([FromBody] CheckPathViewModel viewModel)
        {
            var found = Directory.Exists(viewModel.Path);
            var result = new
            {
                path = viewModel.Path,
                found
            };

            return result;
        }

        [HttpPost("find")]
        public ActionResult<object> Find([FromBody] FindViewModel viewModel)
        {
            var path = viewModel.Path;
            var search = $"*{ viewModel.Search }*";
            var searchOptions = new EnumerationOptions()
            {
                MatchCasing = viewModel.CaseSensitive ? MatchCasing.CaseSensitive : MatchCasing.CaseInsensitive,
                RecurseSubdirectories = viewModel.Recursive
            };

            var folders = Directory.GetDirectories(path, search, searchOptions);
            folders = folders.Select(x => x.Substring(path.Length)).ToArray();

            var files = Directory.GetFiles(path, search, searchOptions);
            files = files.Select(x => x.Substring(path.Length)).ToArray();

            var result = new
            {
                path = viewModel.Path,
                search = viewModel.Search,
                caseSensitive = viewModel.CaseSensitive,
                recursive = viewModel.Recursive,
                folders,
                files
            };

            return result;
        }

        [HttpPost("replace")]
        public ActionResult<object> Replace([FromBody] ReplaceViewModel viewModel)
        {
            var path = viewModel.Path;
            var search = $"*{ viewModel.Search }*";
            var replace = viewModel.Replace;
            var searchOptions = new EnumerationOptions()
            {
                MatchCasing = viewModel.CaseSensitive ? MatchCasing.CaseSensitive : MatchCasing.CaseInsensitive,
                RecurseSubdirectories = viewModel.Recursive
            };
            var replaceOptions = viewModel.CaseSensitive ? RegexOptions.None : RegexOptions.IgnoreCase;

            var oldFolders = Directory.GetDirectories(path, search, searchOptions);
            var folders = Replace(
                path, viewModel.Search, replace, replaceOptions,
                oldFolders,
                (oldFolder, newFolder) => { Directory.Move(oldFolder, newFolder); });

            var oldFiles = Directory.GetFiles(path, search, searchOptions);
            var files = Replace(
                path, viewModel.Search, replace, replaceOptions,
                oldFiles,
                (oldFile, newFile) => { System.IO.File.Move(oldFile, newFile); });

            var result = new
            {
                path = viewModel.Path,
                search = viewModel.Search,
                replace = viewModel.Replace,
                caseSensitive = viewModel.CaseSensitive,
                recursive = viewModel.Recursive,
                folders,
                files
            };

            return result;
        }

        private List<dynamic> Replace(
            string path, string search, string replace, RegexOptions replaceOptions,
            string[] oldItems,
            Action<string, string> moveAction)
        {
            var items = new List<dynamic>();

            foreach (var oldItem in oldItems)
            {
                var itemPath = Path.GetDirectoryName(oldItem);
                var itemName = Path.GetFileName(oldItem);
                var newItemName = Regex.Replace(itemName, search, replace, replaceOptions);
                var newItem = Path.Combine(itemPath, newItemName);
                var itemNameDiff = Regex.Replace(itemName, search, "<" + replace + ">", replaceOptions);
                var itemDiff = Path.Combine(itemPath, itemNameDiff);
                items.Add(new
                {
                    oldValue = oldItem.Substring(path.Length),
                    newValue = newItem.Substring(path.Length),
                    diff = itemDiff.Substring(path.Length)
                });
                moveAction(oldItem, newItem);
            }

            return items;
        }
    }
}