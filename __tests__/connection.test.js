const { testConnection } = require("../src/config/database.js");
const dotenv = require('dotenv'); dotenv.config();

describe("Successful database connection", () => {
    it ("should connect to the database successfuly", async () => {
        const result = await testConnection()
        expect(result).toBe(true)
    })
})