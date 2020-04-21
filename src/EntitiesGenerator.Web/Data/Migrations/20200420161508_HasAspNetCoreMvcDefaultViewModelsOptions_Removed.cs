using Microsoft.EntityFrameworkCore.Migrations;

namespace EntitiesGenerator.Web.Data.Migrations
{
    public partial class HasAspNetCoreMvcDefaultViewModelsOptions_Removed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasAspNetCoreMvcDefaultViewModelsOptions",
                table: "Modules");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasAspNetCoreMvcDefaultViewModelsOptions",
                table: "Modules",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
