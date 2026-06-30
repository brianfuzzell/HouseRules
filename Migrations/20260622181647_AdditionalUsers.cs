using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HouseRules.Migrations
{
    /// <inheritdoc />
    public partial class AdditionalUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "fa5f1bce-1251-41da-bff4-e82568cf53ef", "AQAAAAIAAYagAAAAEGnZhMkO1uDpzqh7jkDBDwBH87HeVAPa5FTMnIITYYDKhu96TKvl7OFZHgr3uVuj6w==", "40591a33-b7b4-4e90-bdf1-67f732a5d8ed" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "2a4c6e8f-3b5d-4a7c-8e9f-1d3c5b7a9e0d", 0, "9236cf61-bc40-41e0-9878-a374c69a27fb", "mjones@example.com", false, false, null, null, null, "AQAAAAIAAYagAAAAEOmXhK+1rjKu+LTnU8Jaqw3LlMFGslaJBK7u78kQ0yvV03IErP7qEJPn5Uc5TE2ZXA==", null, false, "2451c57f-6238-454a-babf-c16c50387a98", false, "mjones" },
                    { "8f7b2e4a-1c3d-4f6e-9a8b-5d2c1e0f3a4b", 0, "1722629f-6a42-4409-8186-0daef376e050", "jsmith@example.com", false, false, null, null, null, "AQAAAAIAAYagAAAAEPPcluhd5M9mw5iuutaBNwGWNhXB5xe34lIvB1IBDrsSYDRnG3cOCbT21afmsUSS4Q==", null, false, "9a0abc60-dd2d-4179-9097-3c5533b58fe5", false, "jsmith" }
                });

            migrationBuilder.InsertData(
                table: "UserProfiles",
                columns: new[] { "Id", "Address", "Email", "FirstName", "IdentityUserId", "LastName", "UserName" },
                values: new object[,]
                {
                    { 2, "202 Oak Avenue", null, "John", "8f7b2e4a-1c3d-4f6e-9a8b-5d2c1e0f3a4b", "Smith", null },
                    { 3, "303 Pine Street", null, "Mary", "2a4c6e8f-3b5d-4a7c-8e9f-1d3c5b7a9e0d", "Jones", null }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "UserProfiles",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "UserProfiles",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2a4c6e8f-3b5d-4a7c-8e9f-1d3c5b7a9e0d");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "8f7b2e4a-1c3d-4f6e-9a8b-5d2c1e0f3a4b");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "0e32886c-66ef-4320-9594-517cc8a42a2d", "AQAAAAIAAYagAAAAEJw8c/WduVLHafLb8rRqJHWvrum2P6iggonqUb/EAVJEj7yP9Nfipu7jIDPqNqIepw==", "2180c8c5-7b09-4dab-bfca-e28eea1f4fcd" });
        }
    }
}
