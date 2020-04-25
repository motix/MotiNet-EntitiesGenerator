using Microsoft.EntityFrameworkCore.Migrations;

namespace EntitiesGenerator.Web.Data.Migrations
{
    public partial class FeatureUseRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeleteRestrict",
                table: "FeatureSettings");

            migrationBuilder.DropColumn(
                name: "HasSortedChildrenInParent",
                table: "FeatureSettings");

            migrationBuilder.DropColumn(
                name: "SortedChildrenInParentCriteriaPropertyName",
                table: "FeatureSettings");

            migrationBuilder.DropColumn(
                name: "HasSortedChildrenInScope",
                table: "FeatureSettings");

            migrationBuilder.DropColumn(
                name: "SortedChildrenInScopeCriteriaPropertyName",
                table: "FeatureSettings");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "DeleteRestrict",
                table: "FeatureSettings",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HasSortedChildrenInParent",
                table: "FeatureSettings",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SortedChildrenInParentCriteriaPropertyName",
                table: "FeatureSettings",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HasSortedChildrenInScope",
                table: "FeatureSettings",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SortedChildrenInScopeCriteriaPropertyName",
                table: "FeatureSettings",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);
        }
    }
}
