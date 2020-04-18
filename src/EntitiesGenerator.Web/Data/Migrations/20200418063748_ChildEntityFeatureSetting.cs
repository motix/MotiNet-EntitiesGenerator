using Microsoft.EntityFrameworkCore.Migrations;

namespace EntitiesGenerator.Web.Data.Migrations
{
    public partial class ChildEntityFeatureSetting : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ChildEntityFeatureSetting_DeleteRestrict",
                table: "FeatureSettings",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HasSortedChildrenInParent",
                table: "FeatureSettings",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ParentName",
                table: "FeatureSettings",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SortedChildrenInParentCriteriaPropertyName",
                table: "FeatureSettings",
                maxLength: 256,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChildEntityFeatureSetting_DeleteRestrict",
                table: "FeatureSettings");

            migrationBuilder.DropColumn(
                name: "HasSortedChildrenInParent",
                table: "FeatureSettings");

            migrationBuilder.DropColumn(
                name: "ParentName",
                table: "FeatureSettings");

            migrationBuilder.DropColumn(
                name: "SortedChildrenInParentCriteriaPropertyName",
                table: "FeatureSettings");
        }
    }
}
