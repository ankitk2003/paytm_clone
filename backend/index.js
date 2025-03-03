import express from "express"
import mongoose from "mongoose";
import cors from "cors"
const userRouter = require("./routes/user");
const app = express();
app.use(cors());
app.use(express.json());
const accountRouter=require("./routes/account");
app.use("/api/v1/user", userRouter);
app.use("/api/v1/account",accountRouter)
async function main() {
  await mongoose.connect(
    "mongodb+srv://ankitdevx1808:ankit2003@cluster0.wlxth.mongodb.net/paytm"
  );
  console.log("db connected");
  await app.listen(3000, () => {
    console.log("server started");
  });
}
main();
