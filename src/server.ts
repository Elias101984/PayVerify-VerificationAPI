import dotenv from "dotenv";
import app from "./app";
import { sequelize } from "./config/database";

dotenv.config();

const PORT = process.env.PORT || 5001;

async function startServer() {
    try {
        await sequelize.authenticate();

        console.log("✅ PostgreSQL Connected");

        app.listen(PORT, () => {
            console.log(
                `🚀 Verification API running on port ${PORT}`
            );
        });
    } catch (error) {
        console.error(
            "❌ Database connection failed",
            error
        );
    }
}

startServer();