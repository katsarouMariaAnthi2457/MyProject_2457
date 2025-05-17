using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyWebCookingApi.Migrations
{
    /// <inheritdoc />
    public partial class Add_FilePath_to_Recipes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FilePath",
                table: "Recipes",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FilePath",
                table: "Recipes");
        }
    }
}
