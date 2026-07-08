"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verificationController_1 = require("../controllers/verificationController");
const router = (0, express_1.Router)();
// =============================================================================
// INTERNAL API
// Used by Main PayVerify application
// =============================================================================
router.post("/verify", verificationController_1.verify);
// =============================================================================
// PUBLIC API
// Used by Banks, Payment Gateways, Trust Center & Sandbox
// =============================================================================
router.post("/verify/account", verificationController_1.verifyAccountEndpoint);
exports.default = router;
