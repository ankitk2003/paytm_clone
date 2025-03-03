const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/user"); // No need for .js in CommonJS
const accountRouter = require("./routes/account");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

async function main() {
  await mongoose.connect(
    "mongodb+srv://ankitdevx1808:ankit2003@cluster0.wlxth.mongodb.net/paytm"
  );
  console.log("db connected");

  app.listen(3000, () => {
    console.log("server started");
  });
}

main();
