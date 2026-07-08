"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMerchant = verifyMerchant;
exports.verifyAccount = verifyAccount;
const Merchant_1 = require("../models/Merchant");
const VerificationEvent_1 = require("../models/VerificationEvent");
// =============================================================================
// INTERNAL VERIFICATION
// Used by Main PayVerify Application
// Searches by Merchant ID
// =============================================================================
async function verifyMerchant(merchantId) {
    const merchant = await Merchant_1.Merchant.findByPk(merchantId);
    console.log("================================");
    console.log("MERCHANT JSON:");
    console.log(merchant?.toJSON());
    console.log("Bank Name:", merchant?.get("bank_name"));
    console.log("Account Number:", merchant?.get("account_number"));
    console.log("================================");
    if (!merchant) {
        return {
            verified: false,
            reasonCode: "MERCHANT_NOT_FOUND",
            message: "Merchant not found."
        };
    }
    await VerificationEvent_1.VerificationEvent.create({
        merchant_id: merchantId,
        verified_by: "PayVerify API",
        source: "MainApp",
        verification_result: "VERIFIED"
    });
    return {
        verified: true,
        merchantId,
        merchantName: merchant.get("name"),
        bankName: merchant.get("bank_name"),
        accountName: merchant.get("name"),
        accountNumberMasked: "******" +
            String(merchant.get("account_number") ?? "").slice(-4),
        trustScore: merchant.get("trust_score"),
        verificationStatus: merchant.get("verification_status"),
        verificationCount: merchant.get("total_verifications"),
        verificationBadge: "Verified by PayVerify"
    };
}
async function verifyAccount(payload) {
    const { bankCode, accountNumber } = payload;
    // -------------------------------------------------------------
    // Search Strategy
    // -------------------------------------------------------------
    // Phase 1
    //
    // If bankCode supplied:
    //      account_number + bank_code
    //
    // Otherwise:
    //      account_number only
    // -------------------------------------------------------------
    let merchant;
    if (bankCode) {
        merchant = await Merchant_1.Merchant.findOne({
            where: {
                account_number: accountNumber,
                bank_code: bankCode
            }
        });
    }
    // Fallback (supports existing merchants that don't yet have bank_code)
    if (!merchant) {
        merchant = await Merchant_1.Merchant.findOne({
            where: {
                account_number: accountNumber
            }
        });
    }
    if (!merchant) {
        return {
            verified: false,
            reasonCode: "MERCHANT_NOT_REGISTERED",
            message: "This account is not registered with PayVerify."
        };
    }
    const merchantId = Number(merchant.get("id"));
    await VerificationEvent_1.VerificationEvent.create({
        merchant_id: merchantId,
        verified_by: "Public Verification API",
        source: "PublicAPI",
        verification_result: "VERIFIED"
    });
    return {
        verified: true,
        merchantId,
        merchantName: merchant.get("name"),
        bankName: merchant.get("bank_name"),
        accountName: merchant.get("name"),
        accountNumberMasked: "******" +
            String(merchant.get("account_number")).slice(-4),
        trustScore: merchant.get("trust_score"),
        verificationStatus: merchant.get("verification_status"),
        verificationCount: merchant.get("total_verifications"),
        verificationBadge: "Verified by PayVerify"
    };
}
