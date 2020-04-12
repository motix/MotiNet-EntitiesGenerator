using Microsoft.EntityFrameworkCore.Migrations;

namespace EntitiesGenerator.Web.Data.Migrations
{
    public partial class Item_ParameterListLineBreak : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ParameterListLineBreak",
                table: "FeatureSettings");

            migrationBuilder.AddColumn<bool>(
                name: "ParameterListLineBreak",
                table: "Items",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ParameterListLineBreak",
                table: "Items");

            migrationBuilder.AddColumn<bool>(
                name: "ParameterListLineBreak",
                table: "FeatureSettings",
                type: "bit",
                nullable: true);
        }
    }
}
