import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.js";  // Add .js extension for ES Modules
import accountRouter from "./routes/account.js"; 

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
