const express = require("express");
const userRouter = express.Router(); // No need to call router()
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User } = require("../db");

const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(), // Corrected the duplicate password field
});

userRouter.post("/signup", async (req, res) => {
  const body = req.body;
  const { success, error } = signupSchema.safeParse(req.body); // Fixed to capture error
  if (!success) {
    return res.status(400).json({
      message: "Invalid input", // Changed to a more appropriate message
      errors: error.errors, // This will show the specific errors
    });
  }
  
  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "User already exists", // Updated the message
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
  
  const userId = user._id;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({ message: "User signed up successfully", token }); // Updated the message
});

userRouter.get("/signin", (req, res) => {
  res.json({ message: "This is the user signin" }); // Kept the same but it's a GET route now
});

module.exports = userRouter;
