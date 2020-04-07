using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntitiesGenerator.Web.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using MotiNet.Entities.Mvc;

namespace EntitiesGenerator.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddUrlRequestLocalization(() =>
            {
                return services.AddRazorPages();
            });
            services.ConfigureUrlRequestLocalization(new[] { "en", "vi" });

            services.AddMotiNet();

            services.AddDbContext<EntitiesGeneratorDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddEntitiesGeneratorWithSealedModels()
                    .AddEntityFrameworkCoreWithSealedModels<EntitiesGeneratorDbContext>()
                    .AddAspNetCore()
                    .AddDefaultViewModels();

            services.TryAddScoped(typeof(IDisplayNameCollector<>), typeof(DisplayNameCollector<>));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();
                endpoints.MapControllers();
            });
        }
    }
}
