using Microsoft.EntityFrameworkCore.Migrations;

namespace EntitiesGenerator.Web.Data.Migrations
{
    public partial class UseActiveField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "UseActiveField",
                table: "FeatureSettings",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UseActiveField",
                table: "FeatureSettings");
        }
    }
}
