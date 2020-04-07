using Microsoft.EntityFrameworkCore.Migrations;

namespace EntitiesGenerator.Web.Data.Migrations
{
    public partial class CreateSchema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Features",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    Position = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: false),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Features", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: false),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Modules",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    ProjectId = table.Column<string>(maxLength: 36, nullable: false),
                    Position = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: false),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Modules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Modules_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    ModuleId = table.Column<string>(maxLength: 36, nullable: false),
                    Position = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: false),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Items_Modules_ModuleId",
                        column: x => x.ModuleId,
                        principalTable: "Modules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ItemFeatureSettings",
                columns: table => new
                {
                    ItemId = table.Column<string>(maxLength: 36, nullable: false),
                    FeatureId = table.Column<string>(maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemFeatureSettings", x => new { x.ItemId, x.FeatureId });
                    table.ForeignKey(
                        name: "FK_ItemFeatureSettings_Features_FeatureId",
                        column: x => x.FeatureId,
                        principalTable: "Features",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ItemFeatureSettings_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ItemsRelationships",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    Item1Id = table.Column<string>(maxLength: 36, nullable: false),
                    Item2Id = table.Column<string>(maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemsRelationships", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemsRelationships_Items_Item1Id",
                        column: x => x.Item1Id,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ItemsRelationships_Items_Item2Id",
                        column: x => x.Item2Id,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Features_Name",
                table: "Features",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Features_NormalizedName",
                table: "Features",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ItemFeatureSettings_FeatureId",
                table: "ItemFeatureSettings",
                column: "FeatureId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_ModuleId_Name",
                table: "Items",
                columns: new[] { "ModuleId", "Name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Items_ModuleId_NormalizedName",
                table: "Items",
                columns: new[] { "ModuleId", "NormalizedName" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ItemsRelationships_Item2Id",
                table: "ItemsRelationships",
                column: "Item2Id");

            migrationBuilder.CreateIndex(
                name: "IX_ItemsRelationships_Item1Id_Item2Id",
                table: "ItemsRelationships",
                columns: new[] { "Item1Id", "Item2Id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Modules_ProjectId_Name",
                table: "Modules",
                columns: new[] { "ProjectId", "Name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Modules_ProjectId_NormalizedName",
                table: "Modules",
                columns: new[] { "ProjectId", "NormalizedName" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_Name",
                table: "Projects",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_NormalizedName",
                table: "Projects",
                column: "NormalizedName",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemFeatureSettings");

            migrationBuilder.DropTable(
                name: "ItemsRelationships");

            migrationBuilder.DropTable(
                name: "Features");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Modules");

            migrationBuilder.DropTable(
                name: "Projects");
        }
    }
}
