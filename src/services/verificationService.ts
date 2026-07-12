import { Merchant } from "../models/Merchant";
import { VerificationEvent } from "../models/VerificationEvent";

// =============================================================================
// INTERNAL VERIFICATION
// Used by Main PayVerify Application
// Searches by Merchant ID
// =============================================================================
export async function verifyMerchant(
    merchantId: number
) {

    const merchant = await Merchant.findByPk(merchantId);

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

    await VerificationEvent.create({

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

        accountNumberMasked:
            "******" +
            String(
                merchant.get("account_number") ?? ""
            ).slice(-4),

        trustScore:
            merchant.get("trust_score"),

        verificationStatus:
            merchant.get("verification_status"),

        verificationCount:
            merchant.get("total_verifications"),

        verificationBadge:
            "Verified by PayVerify"

    };

}

// =============================================================================
// PUBLIC VERIFICATION
//
// Used by:
// • Banks
// • Payment Gateways
// • Trust Center
// • Public Sandbox
//
// MVP:
// Searches by accountNumber.
//
// bankCode remains part of the API request contract for future use,
// but the current merchants table does not contain a bank_code column.
// =============================================================================

interface VerifyAccountRequest {

    bankCode?: string;

    accountNumber: string;

}

export async function verifyAccount(
    payload: VerifyAccountRequest
) {

    const {
        bankCode,
        accountNumber
    } = payload;

    // -------------------------------------------------------------
    // MVP Search Strategy
    // -------------------------------------------------------------
    // The current merchants table contains:
    //
    //   account_number
    //   bank_name
    //
    // but does NOT contain:
    //
    //   bank_code
    //
    // Therefore we search by account_number only.
    //
    // bankCode is retained in the API contract for future schema support.
    // -------------------------------------------------------------

    console.log("Account verification request:", {
        bankCode,
        accountNumber
    });

    const merchant = await Merchant.findOne({

        where: {

            account_number: accountNumber

        }

    });

    if (!merchant) {

        return {

            verified: false,

            reasonCode: "MERCHANT_NOT_REGISTERED",

            message:
                "This account is not registered with PayVerify."

        };

    }

    const merchantId = Number(
        merchant.get("id")
    );

    await VerificationEvent.create({

        merchant_id: merchantId,

        verified_by: "Public Verification API",

        source: "PublicAPI",

        verification_result: "VERIFIED"

    });

    return {

        verified: true,

        merchantId,

        merchantName:
            merchant.get("name"),

        bankName:
            merchant.get("bank_name"),

        accountName:
            merchant.get("name"),

        accountNumberMasked:
            "******" +
            String(
                merchant.get("account_number") ?? ""
            ).slice(-4),

        trustScore:
            merchant.get("trust_score"),

        verificationStatus:
            merchant.get("verification_status"),

        verificationCount:
            merchant.get("total_verifications"),

        verificationBadge:
            "Verified by PayVerify"

    };

}