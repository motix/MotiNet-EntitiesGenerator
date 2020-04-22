using Microsoft.EntityFrameworkCore.Migrations;

namespace EntitiesGenerator.Web.Data.Migrations
{
    public partial class ManyToManyItemsRelationships : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "ItemsRelationships",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ModuleId",
                table: "ItemsRelationships",
                maxLength: 36,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_ItemsRelationships_ModuleId",
                table: "ItemsRelationships",
                column: "ModuleId");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemsRelationships_Modules_ModuleId",
                table: "ItemsRelationships",
                column: "ModuleId",
                principalTable: "Modules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemsRelationships_Modules_ModuleId",
                table: "ItemsRelationships");

            migrationBuilder.DropIndex(
                name: "IX_ItemsRelationships_ModuleId",
                table: "ItemsRelationships");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "ItemsRelationships");

            migrationBuilder.DropColumn(
                name: "ModuleId",
                table: "ItemsRelationships");
        }
    }
}
