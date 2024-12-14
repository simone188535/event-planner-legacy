import dotenv from "dotenv";
import "module-alias/register";
import { pool } from "@db/index";
import app from "@root/app";

dotenv.config({ path: "./config.env" });

// connect DB
(async () => {
  try {
    await pool.connect();
    console.log("DB initialized");
  } catch (err) {
    console.error('PG DB connection failed!', err)
    process.exit(-1)
  }
})();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err: Error) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
