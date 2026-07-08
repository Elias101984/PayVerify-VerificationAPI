"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantAccount = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
exports.MerchantAccount = database_1.sequelize.define("MerchantAccount", {
    merchant_id: sequelize_1.DataTypes.INTEGER,
    bank_name: sequelize_1.DataTypes.STRING,
    account_number: sequelize_1.DataTypes.STRING,
    account_name: sequelize_1.DataTypes.STRING,
    verification_status: sequelize_1.DataTypes.STRING,
    is_primary: sequelize_1.DataTypes.BOOLEAN
}, {
    tableName: "merchant_accounts",
    timestamps: false
});
