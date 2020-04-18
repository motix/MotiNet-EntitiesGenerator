using Microsoft.EntityFrameworkCore.Migrations;

namespace EntitiesGenerator.Web.Data.Migrations
{
    public partial class DeleteRestrict_SameColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChildEntityFeatureSetting_DeleteRestrict",
                table: "FeatureSettings");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ChildEntityFeatureSetting_DeleteRestrict",
                table: "FeatureSettings",
                type: "bit",
                nullable: true);
        }
    }
}
