using EntitiesGenerator.Web.Code;
using EntitiesGenerator.Web.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;

namespace EntitiesGenerator.Web.Pages
{
    public class SeedDataModel : PageModel
    {
        private EntitiesGeneratorDbContext _dbContext { get; }

        public SeedDataModel(EntitiesGeneratorDbContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public IActionResult OnPostClearAsync(int id)
        {
            SeedData.Clear(_dbContext);
            return RedirectToPage();
        }

        public IActionResult OnPostInitializeAsync(int id)
        {
            SeedData.Initialize(_dbContext);
            return RedirectToPage();
        }
    }
}