using Microsoft.EntityFrameworkCore.Migrations;

namespace EntitiesGenerator.Web.Data.Migrations
{
    public partial class ItemsRelationship_Item1Item2NotUnique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Modules_ModuleId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_Modules_Projects_ProjectId",
                table: "Modules");

            migrationBuilder.DropIndex(
                name: "IX_ItemsRelationships_Item1Id_Item2Id",
                table: "ItemsRelationships");

            migrationBuilder.CreateIndex(
                name: "IX_ItemsRelationships_Item1Id",
                table: "ItemsRelationships",
                column: "Item1Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Modules_ModuleId",
                table: "Items",
                column: "ModuleId",
                principalTable: "Modules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Modules_Projects_ProjectId",
                table: "Modules",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Modules_ModuleId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_Modules_Projects_ProjectId",
                table: "Modules");

            migrationBuilder.DropIndex(
                name: "IX_ItemsRelationships_Item1Id",
                table: "ItemsRelationships");

            migrationBuilder.CreateIndex(
                name: "IX_ItemsRelationships_Item1Id_Item2Id",
                table: "ItemsRelationships",
                columns: new[] { "Item1Id", "Item2Id" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Modules_ModuleId",
                table: "Items",
                column: "ModuleId",
                principalTable: "Modules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Modules_Projects_ProjectId",
                table: "Modules",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
