"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Merchant = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
exports.Merchant = database_1.sequelize.define("Merchant", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    name: sequelize_1.DataTypes.STRING,
    // =========================================================================
    // ADDED
    // =========================================================================
    // WHY:
    // The Verification API returns bank name and masked account number.
    // These fields already exist in the merchants table but were missing
    // from the Sequelize model, so merchant.get("bank_name") and
    // merchant.get("account_number") always returned undefined.
    // =========================================================================
    bank_name: sequelize_1.DataTypes.STRING,
    account_number: sequelize_1.DataTypes.STRING,
    // Added now because verifyAccount() already supports it.
    // Existing merchants without a value will still work because the
    // service falls back to account_number-only lookup.
    //bank_code: DataTypes.STRING,
    // =========================================================================
    trust_score: sequelize_1.DataTypes.INTEGER,
    verification_status: sequelize_1.DataTypes.STRING,
    total_verifications: sequelize_1.DataTypes.INTEGER,
    badge_tier: sequelize_1.DataTypes.STRING
}, {
    tableName: "merchants",
    timestamps: false
});
