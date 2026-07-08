import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Merchant = sequelize.define(
    "Merchant",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },

        name: DataTypes.STRING,

        // =========================================================================
        // ADDED
        // =========================================================================
        // WHY:
        // The Verification API returns bank name and masked account number.
        // These fields already exist in the merchants table but were missing
        // from the Sequelize model, so merchant.get("bank_name") and
        // merchant.get("account_number") always returned undefined.
        // =========================================================================

        bank_name: DataTypes.STRING,

        account_number: DataTypes.STRING,

        // Added now because verifyAccount() already supports it.
        // Existing merchants without a value will still work because the
        // service falls back to account_number-only lookup.
        //bank_code: DataTypes.STRING,

        // =========================================================================

        trust_score: DataTypes.INTEGER,

        verification_status: DataTypes.STRING,

        total_verifications: DataTypes.INTEGER,

        badge_tier: DataTypes.STRING
    },
    {
        tableName: "merchants",
        timestamps: false
    }
    
);