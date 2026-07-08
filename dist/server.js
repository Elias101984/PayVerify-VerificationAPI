"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
dotenv_1.default.config();
const PORT = process.env.PORT || 5001;
async function startServer() {
    try {
        await database_1.sequelize.authenticate();
        console.log("✅ PostgreSQL Connected");
        app_1.default.listen(PORT, () => {
            console.log(`🚀 Verification API running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Database connection failed", error);
    }
}
startServer();
