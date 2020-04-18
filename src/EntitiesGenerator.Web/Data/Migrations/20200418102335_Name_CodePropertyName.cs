using Microsoft.EntityFrameworkCore.Migrations;

namespace EntitiesGenerator.Web.Data.Migrations
{
    public partial class Name_CodePropertyName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CodePropertyName",
                table: "FeatureSettings",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NamePropertyName",
                table: "FeatureSettings",
                maxLength: 256,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CodePropertyName",
                table: "FeatureSettings");

            migrationBuilder.DropColumn(
                name: "NamePropertyName",
                table: "FeatureSettings");
        }
    }
}
