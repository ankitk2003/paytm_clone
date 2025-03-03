import mongoose, { Schema, model } from "mongoose";
import { string } from "zod";

const userSchema = new Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
});

const accountSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: { type: Number, required: true }

});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
export { User, Account };
