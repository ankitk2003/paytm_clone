const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/user");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter);

async function main() {
  await mongoose.connect(
    "mongodb+srv://ankitdevx1808:ankit2003@cluster0.wlxth.mongodb.net/paytm"
  );
  console.log("db connected");
  await app.listen(8080, () => {
    console.log("server started");
  });
}
main();
