using Microsoft.EntityFrameworkCore.Migrations;

namespace EntitiesGenerator.Web.Data.Migrations
{
    public partial class FeatureSetting : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemFeatureSettings");

            migrationBuilder.DropTable(
                name: "Features");

            migrationBuilder.CreateTable(
                name: "FeatureSettings",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    ItemId = table.Column<string>(maxLength: 36, nullable: false),
                    Discriminator = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeatureSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FeatureSettings_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FeatureSettings_ItemId_Discriminator",
                table: "FeatureSettings",
                columns: new[] { "ItemId", "Discriminator" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FeatureSettings");

            migrationBuilder.CreateTable(
                name: "Features",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(36)", maxLength: 36, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Position = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Features", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ItemFeatureSettings",
                columns: table => new
                {
                    ItemId = table.Column<string>(type: "nvarchar(36)", maxLength: 36, nullable: false),
                    FeatureId = table.Column<string>(type: "nvarchar(36)", maxLength: 36, nullable: false)
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
        }
    }
}
