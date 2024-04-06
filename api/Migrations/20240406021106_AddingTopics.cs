using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tweeter.Migrations
{
    /// <inheritdoc />
    public partial class AddingTopics : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "schema");

            migrationBuilder.CreateTable(
                name: "Topics",
                schema: "schema",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedByUserId = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Topics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Topics_AspNetUsers_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalSchema: "identity",
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserTopics",
                schema: "schema",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    TopicId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTopics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserTopics_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalSchema: "identity",
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserTopics_Topics_TopicId",
                        column: x => x.TopicId,
                        principalSchema: "schema",
                        principalTable: "Topics",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Topics_CreatedByUserId",
                schema: "schema",
                table: "Topics",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTopics_TopicId",
                schema: "schema",
                table: "UserTopics",
                column: "TopicId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTopics_UserId",
                schema: "schema",
                table: "UserTopics",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserTopics",
                schema: "schema");

            migrationBuilder.DropTable(
                name: "Topics",
                schema: "schema");
        }
    }
}
