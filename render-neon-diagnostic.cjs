const { Client } = require("pg");
const { Sequelize } = require("sequelize");

const required = [
  "DB_HOST",
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD",
  "DB_PORT"
];

console.log("\n=== PAYVERIFY DATABASE DIAGNOSTIC V2 ===");

for (const key of required) {
  console.log(`${key}: ${process.env[key] ? "CONFIGURED" : "MISSING"}`);
}

const missing = required.filter(key => !process.env[key]);

if (missing.length) {
  console.error("FAILED: Missing required environment variables");
  process.exit(1);
}

const config = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 10000
};

async function testPg() {
  console.log("\n=== TEST A: DIRECT POSTGRESQL DRIVER ===");

  const client = new Client(config);

  try {
    await client.connect();

    const result = await client.query(
      "SELECT current_database() AS database, current_user AS username"
    );

    console.log("PG RESULT: SUCCESS");
    console.table(result.rows);

    return true;
  } catch (error) {
    console.error("PG RESULT: FAILED");
    console.error("PG ERROR CODE:", error.code || "UNKNOWN");
    console.error("PG ERROR TYPE:", error.name);

    return false;
  } finally {
    await client.end().catch(() => {});
  }
}

async function testSequelize() {
  console.log("\n=== TEST B: SEQUELIZE ===");

  const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
      host: config.host,
      port: config.port,
      dialect: "postgres",
      logging: false,
      pool: { max: 1, min: 0 },
      dialectOptions: {
        ssl: config.ssl,
        connectionTimeoutMillis: 10000
      }
    }
  );

  try {
    await sequelize.authenticate();

    console.log("SEQUELIZE RESULT: SUCCESS");

    return true;
  } catch (error) {
    console.error("SEQUELIZE RESULT: FAILED");
    console.error(
      "SEQUELIZE ERROR CODE:",
      error.parent?.code || "UNKNOWN"
    );
    console.error("SEQUELIZE ERROR TYPE:", error.name);

    return false;
  } finally {
    await sequelize.close();
  }
}

(async () => {
  const pgSuccess = await testPg();
  const sequelizeSuccess = await testSequelize();

  console.log("\n=== FINAL COMPARISON ===");
  console.log("PostgreSQL driver:", pgSuccess ? "PASS" : "FAIL");
  console.log("Sequelize:", sequelizeSuccess ? "PASS" : "FAIL");

  if (!pgSuccess || !sequelizeSuccess) {
    process.exitCode = 1;
  }
})();
