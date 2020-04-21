using Microsoft.EntityFrameworkCore.Migrations;

namespace EntitiesGenerator.Web.Data.Migrations
{
    public partial class HasSealedModelsOptions_Removed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasSealedModelsOptions",
                table: "Modules");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasSealedModelsOptions",
                table: "Modules",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
