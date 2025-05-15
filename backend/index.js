const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/user");
const accountRouter = require("./routes/account");

const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

async function main() {
  await mongoose.connect(
    "mongodb+srv://ankitdevx1808:ankit2003@cluster0.wlxth.mongodb.net/paytm"
  );
  console.log("db connected");

  app.listen(3000, () => {
    console.log("server started on http://localhost:3000");
  });
}

main();
