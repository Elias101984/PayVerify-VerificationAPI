"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUi = exports.swaggerDocument = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
exports.swaggerUi = swagger_ui_express_1.default;
exports.swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "PayVerify Verification API",
        version: "2.0.0",
        description: "Merchant Verification API"
    },
    paths: {
        // =============================================================
        // INTERNAL API
        // =============================================================
        "/api/v1/verify": {
            post: {
                summary: "Internal Merchant Verification (Merchant ID)",
                tags: ["Internal"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    merchantId: {
                                        type: "integer",
                                        example: 40
                                    }
                                },
                                required: [
                                    "merchantId"
                                ]
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Merchant verified successfully"
                    },
                    "400": {
                        description: "Bad request"
                    },
                    "500": {
                        description: "Server error"
                    }
                }
            }
        },
        // =============================================================
        // PUBLIC API
        // =============================================================
        "/api/v1/verify/account": {
            post: {
                summary: "Public Account Verification",
                description: "Verifies whether a destination bank account is registered with PayVerify.",
                tags: ["Public"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    bankCode: {
                                        type: "string",
                                        example: "044",
                                        description: "Optional for MVP"
                                    },
                                    accountNumber: {
                                        type: "string",
                                        example: "1234556789"
                                    }
                                },
                                required: [
                                    "accountNumber"
                                ]
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Verification completed"
                    },
                    "400": {
                        description: "Invalid request"
                    },
                    "500": {
                        description: "Server error"
                    }
                }
            }
        }
    }
};
