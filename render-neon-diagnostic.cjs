const { Sequelize } = require("sequelize");

const required = [
  "DB_HOST",
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD",
  "DB_PORT"
];

console.log("=== PAYVERIFY NEON DIAGNOSTIC ===");

for (const key of required) {
  console.log(`${key}: ${process.env[key] ? "CONFIGURED" : "MISSING"}`);
}

const missing = required.filter(key => !process.env[key]);

if (missing.length) {
  console.error("FAILED: Required database configuration is missing");
  process.exit(1);
}

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

(async () => {
  try {
    await db.authenticate();

    console.log("SUCCESS: Sequelize authenticated to Neon");

    const [rows] = await db.query(
      "SELECT current_database() AS database, current_user AS username"
    );

    console.table(rows);
  } catch (error) {
    console.error("FAILED: Database authentication");
    console.error("Error code:", error.parent?.code || "UNKNOWN");
    console.error("Error type:", error.name);
    process.exitCode = 1;
  } finally {
    await db.close();
  }
})();
