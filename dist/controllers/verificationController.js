"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = verify;
exports.verifyAccountEndpoint = verifyAccountEndpoint;
const verificationService_1 = require("../services/verificationService");
// =============================================================================
// INTERNAL ENDPOINT
// POST /api/v1/verify
//
// Used internally by the PayVerify platform.
// Looks up merchants by merchantId.
// =============================================================================
async function verify(req, res) {
    try {
        console.log("Verification request received:", req.body);
        const { merchantId } = req.body;
        if (!merchantId) {
            return res.status(400).json({
                verified: false,
                message: "merchantId is required."
            });
        }
        const result = await (0, verificationService_1.verifyMerchant)(Number(merchantId));
        return res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            verified: false,
            message: "Verification failed."
        });
    }
}
// =============================================================================
// PUBLIC ENDPOINT
// POST /api/v1/verify/account
//
// Used by:
// • Banks
// • Payment Gateways
// • POS Providers
// • Public Sandbox
//
// Looks up merchants by bank/account number.
// =============================================================================
async function verifyAccountEndpoint(req, res) {
    try {
        console.log("Account verification request:", req.body);
        const { bankCode, accountNumber } = req.body;
        if (!accountNumber) {
            return res.status(400).json({
                verified: false,
                reasonCode: "ACCOUNT_REQUIRED",
                message: "Account number is required."
            });
        }
        const result = await (0, verificationService_1.verifyAccount)({
            bankCode,
            accountNumber
        });
        return res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            verified: false,
            reasonCode: "SERVER_ERROR",
            message: "Verification failed."
        });
    }
}
