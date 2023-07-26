const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookRouter = require("./routers/bookRouter");
const reviewRouter = require("./routers/reviewRouter");
const userRouter = require("./routers/userRouter");

const config = require("./config/config");

async function main() {
  // Database connection :
  await mongoose.connect(config.uri);
  console.log("Database connection successful.");

  // Create server :
  const server = express();
  server.use(express.json());
  server.use(cors());

  server.use("/api/v1/books", bookRouter);
  server.use("/api/v1/reviews", reviewRouter);
  server.use("/api/v1/users", userRouter);

  server.get("/ping", (req, res) => {
    return res.json({
      time: Date(),
    });
  });

  // Start server :
  await server.listen(config.port);
  console.log(`Server started on port ${config.port}.`);
}

main().catch((err) => {
  console.log(err);
});
