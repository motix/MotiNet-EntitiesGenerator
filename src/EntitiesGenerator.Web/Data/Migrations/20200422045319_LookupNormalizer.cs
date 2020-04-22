using Microsoft.EntityFrameworkCore.Migrations;

namespace EntitiesGenerator.Web.Data.Migrations
{
    public partial class LookupNormalizer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LookupNormalizer",
                table: "FeatureSettings",
                maxLength: 200,
                nullable: false,
                defaultValue: "LowerInvariantLookupNormalizer");

            migrationBuilder.AddColumn<string>(
                name: "NameBasedEntityFeatureSetting_LookupNormalizer",
                table: "FeatureSettings",
                maxLength: 200,
                nullable: false,
                defaultValue: "LowerInvariantLookupNormalizer");

            migrationBuilder.AddColumn<string>(
                name: "ScopedNameBasedEntityFeatureSetting_LookupNormalizer",
                table: "FeatureSettings",
                maxLength: 200,
                nullable: false,
                defaultValue: "LowerInvariantLookupNormalizer");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LookupNormalizer",
                table: "FeatureSettings");

            migrationBuilder.DropColumn(
                name: "NameBasedEntityFeatureSetting_LookupNormalizer",
                table: "FeatureSettings");

            migrationBuilder.DropColumn(
                name: "ScopedNameBasedEntityFeatureSetting_LookupNormalizer",
                table: "FeatureSettings");
        }
    }
}
