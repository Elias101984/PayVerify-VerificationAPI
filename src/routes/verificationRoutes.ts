import { Router } from "express";

import {
    verify,
    verifyAccountEndpoint
} from "../controllers/verificationController";

const router = Router();

// =============================================================================
// INTERNAL API
// Used by Main PayVerify application
// =============================================================================
router.post(
    "/verify",
    verify
);

// =============================================================================
// PUBLIC API
// Used by Banks, Payment Gateways, Trust Center & Sandbox
// =============================================================================
router.post(
    "/verify/account",
    verifyAccountEndpoint
);

export default router;