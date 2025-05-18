using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyWebCookingApi.Migrations
{
    /// <inheritdoc />
    public partial class Add_NumberOfVotes_In_Recippes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberOfVotes",
                table: "Recipes",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfVotes",
                table: "Recipes");
        }
    }
}
