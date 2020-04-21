using Microsoft.EntityFrameworkCore.Migrations;

namespace EntitiesGenerator.Web.Data.Migrations
{
    public partial class HasOptionsAll : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasAspNetCoreMvcDefaultViewModelsOptions",
                table: "Modules",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasAspNetCoreOptions",
                table: "Modules",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasEntityFrameworkCoreSealedModelsOptions",
                table: "Modules",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasSealedModelsOptions",
                table: "Modules",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasAspNetCoreMvcDefaultViewModelsOptions",
                table: "Modules");

            migrationBuilder.DropColumn(
                name: "HasAspNetCoreOptions",
                table: "Modules");

            migrationBuilder.DropColumn(
                name: "HasEntityFrameworkCoreSealedModelsOptions",
                table: "Modules");

            migrationBuilder.DropColumn(
                name: "HasSealedModelsOptions",
                table: "Modules");
        }
    }
}
