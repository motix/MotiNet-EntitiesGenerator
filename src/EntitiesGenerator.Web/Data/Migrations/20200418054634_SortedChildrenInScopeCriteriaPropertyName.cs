using Microsoft.EntityFrameworkCore.Migrations;

namespace EntitiesGenerator.Web.Data.Migrations
{
    public partial class SortedChildrenInScopeCriteriaPropertyName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SortedChildrenInScopePropertyName",
                table: "FeatureSettings",
                newName: "SortedChildrenInScopeCriteriaPropertyName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SortedChildrenInScopeCriteriaPropertyName",
                table: "FeatureSettings",
                newName: "SortedChildrenInScopePropertyName");
        }
    }
}
