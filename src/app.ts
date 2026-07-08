import express from "express";
import cors from "cors";

import verificationRoutes
    from "./routes/verificationRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "PayVerify Verification API"
    });
});

app.use(
    "/api/v1",
    verificationRoutes
);


import {
    swaggerUi,
    swaggerDocument
}
    from "./config/swagger";

app.use(
    "/swagger",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

export default app;