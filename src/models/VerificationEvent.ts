import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const VerificationEvent = sequelize.define(
    "VerificationEvent",
    {
        merchant_id: DataTypes.INTEGER,

        verified_by: DataTypes.STRING,

        source: DataTypes.STRING,

        verification_result: DataTypes.STRING
    },
    {
        tableName: "verification_events",
        createdAt: "created_at",
        updatedAt: false
    }
);