using Microsoft.EntityFrameworkCore.Migrations;

namespace EntitiesGenerator.Web.Data.Migrations
{
    public partial class ItemsRelationshipSettings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasSortedItem1sInItem2",
                table: "ItemsRelationships",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HasSortedItem2sInItem1",
                table: "ItemsRelationships",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SortedItem1sInItem2CriteriaPropertyName",
                table: "ItemsRelationships",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SortedItem2sInItem1CriteriaPropertyName",
                table: "ItemsRelationships",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "DeleteRestrict",
                table: "ItemsRelationships",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HasSortedChildrenInParent",
                table: "ItemsRelationships",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SortedChildrenInParentCriteriaPropertyName",
                table: "ItemsRelationships",
                maxLength: 200,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasSortedItem1sInItem2",
                table: "ItemsRelationships");

            migrationBuilder.DropColumn(
                name: "HasSortedItem2sInItem1",
                table: "ItemsRelationships");

            migrationBuilder.DropColumn(
                name: "SortedItem1sInItem2CriteriaPropertyName",
                table: "ItemsRelationships");

            migrationBuilder.DropColumn(
                name: "SortedItem2sInItem1CriteriaPropertyName",
                table: "ItemsRelationships");

            migrationBuilder.DropColumn(
                name: "DeleteRestrict",
                table: "ItemsRelationships");

            migrationBuilder.DropColumn(
                name: "HasSortedChildrenInParent",
                table: "ItemsRelationships");

            migrationBuilder.DropColumn(
                name: "SortedChildrenInParentCriteriaPropertyName",
                table: "ItemsRelationships");
        }
    }
}
