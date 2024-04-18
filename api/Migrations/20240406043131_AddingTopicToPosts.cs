using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tweeter.Migrations
{
    /// <inheritdoc />
    public partial class AddingTopicToPosts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TopicId",
                schema: "schema",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Posts_TopicId",
                schema: "schema",
                table: "Posts",
                column: "TopicId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Topics_TopicId",
                schema: "schema",
                table: "Posts",
                column: "TopicId",
                principalSchema: "schema",
                principalTable: "Topics",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Topics_TopicId",
                schema: "schema",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_TopicId",
                schema: "schema",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "TopicId",
                schema: "schema",
                table: "Posts");
        }
    }
}
