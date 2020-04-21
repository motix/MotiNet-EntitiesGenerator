using Microsoft.EntityFrameworkCore.Migrations;

namespace EntitiesGenerator.Web.Data.Migrations
{
    public partial class HasCoreOptions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "HasOptions",
                table: "Modules",
                newName: "HasCoreOptions");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "HasCoreOptions",
                table: "Modules",
                newName: "HasOptions");
        }
    }
}
