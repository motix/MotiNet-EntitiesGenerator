using Microsoft.EntityFrameworkCore.Migrations;

namespace EntitiesGenerator.Web.Data.Migrations
{
    public partial class Project_Locations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Namespace",
                table: "Projects",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GenerateLocation",
                table: "Projects",
                maxLength: 253,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WorkingLocation",
                table: "Projects",
                maxLength: 253,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GenerateLocation",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "WorkingLocation",
                table: "Projects");

            migrationBuilder.AlterColumn<string>(
                name: "Namespace",
                table: "Projects",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 200,
                oldNullable: true);
        }
    }
}
