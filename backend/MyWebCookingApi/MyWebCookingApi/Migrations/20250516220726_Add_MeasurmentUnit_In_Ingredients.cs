using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyWebCookingApi.Migrations
{
    /// <inheritdoc />
    public partial class Add_MeasurmentUnit_In_Ingredients : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MeasurmentUnit",
                table: "Ingredients",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MeasurmentUnit",
                table: "Ingredients");
        }
    }
}
