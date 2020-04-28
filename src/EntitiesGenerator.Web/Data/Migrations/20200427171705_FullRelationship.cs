using Microsoft.EntityFrameworkCore.Migrations;

namespace EntitiesGenerator.Web.Data.Migrations
{
    public partial class FullRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasFullItem1sInItem2ViewModel",
                table: "ItemsRelationships",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HasFullItem2sInItem1ViewModel",
                table: "ItemsRelationships",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HasFullChildrenInParentViewModel",
                table: "ItemsRelationships",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HasFullParentInChildrenViewModel",
                table: "ItemsRelationships",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasFullItem1sInItem2ViewModel",
                table: "ItemsRelationships");

            migrationBuilder.DropColumn(
                name: "HasFullItem2sInItem1ViewModel",
                table: "ItemsRelationships");

            migrationBuilder.DropColumn(
                name: "HasFullChildrenInParentViewModel",
                table: "ItemsRelationships");

            migrationBuilder.DropColumn(
                name: "HasFullParentInChildrenViewModel",
                table: "ItemsRelationships");
        }
    }
}
