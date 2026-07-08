"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const verificationRoutes_1 = __importDefault(require("./routes/verificationRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "PayVerify Verification API"
    });
});
app.use("/api/v1", verificationRoutes_1.default);
const swagger_1 = require("./config/swagger");
app.use("/swagger", swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.swaggerDocument));
exports.default = app;
