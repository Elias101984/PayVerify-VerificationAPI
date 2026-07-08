"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationEvent = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
exports.VerificationEvent = database_1.sequelize.define("VerificationEvent", {
    merchant_id: sequelize_1.DataTypes.INTEGER,
    verified_by: sequelize_1.DataTypes.STRING,
    source: sequelize_1.DataTypes.STRING,
    verification_result: sequelize_1.DataTypes.STRING
}, {
    tableName: "verification_events",
    createdAt: "created_at",
    updatedAt: false
});
