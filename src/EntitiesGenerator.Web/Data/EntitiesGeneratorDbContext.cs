﻿using EntitiesGenerator.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EntitiesGenerator.Web.Data
{
    public class EntitiesGeneratorDbContext : EntitiesGeneratorDbContextBase
    {
        public EntitiesGeneratorDbContext(DbContextOptions options) : base(options) { }
    }
}
