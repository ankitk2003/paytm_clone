const express = require("express");
const accountRouter = express.Router();
const { userMiddleware } = require("../middleware/userMiddleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

accountRouter.get("/balance", userMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId }).select("balance");
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json({ balance: account.balance });
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({ message: "Server error" });
  }
});

accountRouter.post("/transfer", userMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    let { amount, to } = req.body;
    amount = Number(amount);

    if (!amount || isNaN(amount) || amount <= 0 || !to) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid amount or recipient" });
    }

    if (req.userId === to) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Cannot transfer to yourself" });
    }

    const senderAccount = await Account.findOne({ userId: req.userId }).select("balance").session(session);
    if (!senderAccount || senderAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const recipientAccount = await Account.findOne({ userId: to }).session(session);
    if (!recipientAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid recipient" });
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }, { session });
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }, { session });

    await session.commitTransaction();
    res.json({ message: "Transfer successful" });

  } catch (error) {
    await session.abortTransaction();
    console.error("Transaction failed:", error);
    res.status(500).json({ message: "Transaction failed" });
  } finally {
    session.endSession();
  }
});

module.exports = accountRouter;
