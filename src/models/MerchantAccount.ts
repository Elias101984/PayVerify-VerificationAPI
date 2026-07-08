import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const MerchantAccount = sequelize.define(
    "MerchantAccount",
    {
        merchant_id: DataTypes.INTEGER,

        bank_name: DataTypes.STRING,

        account_number: DataTypes.STRING,

        account_name: DataTypes.STRING,

        verification_status: DataTypes.STRING,

        is_primary: DataTypes.BOOLEAN
    },
    {
        tableName: "merchant_accounts",
        timestamps: false
    }
);