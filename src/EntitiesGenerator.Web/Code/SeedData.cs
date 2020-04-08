using EntitiesGenerator.Web.Data;
using MotiNet;
using System.Collections.Generic;
using System.Linq;

namespace EntitiesGenerator.Web.Code
{
    public static class SeedData
    {
        public static void Initialize(EntitiesGeneratorDbContext context)
        {
            InitializeFeatures(context);
        }

        public static void InitializeFeatures(EntitiesGeneratorDbContext context)
        {
            context.Database.EnsureCreated();

            if (!context.Features.Any())
            {
                var names = new List<string> {
                    "TimeTrackedEntity",
                    "CodeBasedEntity",
                    "NameBasedEntity",
                    "GroupedEntity",
                    "ScopedNameBasedEntity",
                    "ReadableIdEntity",
                    "OnOffEntity",
                    "DeleteMarkEntity",
                    "TaggedEntity",
                    "ChildEntity",
                    "MasterDetailsEntity",
                    "PreprocessedEntity"

                };
                var features = names.Select(x => new Feature
                {
                    Id = x.ToUrlFriendly(),
                    IsActive = true,
                    Position = names.IndexOf(x) + 1,
                    Name = x,
                    NormalizedName = x.ToLower()
                });

                context.Features.AddRange(features);
                context.SaveChanges();
            }
        }

        public static void Clear(EntitiesGeneratorDbContext context)
        {
            context.Database.EnsureCreated();

            context.ItemsRelationships.RemoveRange(context.ItemsRelationships);
            context.ItemFeatureSettings.RemoveRange(context.ItemFeatureSettings);
            context.Items.RemoveRange(context.Items);
            context.Modules.RemoveRange(context.Modules);
            context.Projects.RemoveRange(context.Projects);
            context.Features.RemoveRange(context.Features);

            context.SaveChanges();
        }
    }
}
