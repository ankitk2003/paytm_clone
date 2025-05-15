const express = require("express");
const userRouter = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User, Account } = require("../db");
const { userMiddleware } = require("../middleware/userMiddleware"); // FIXED import

// Signup Schema Validation
const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

// Signup Route
userRouter.post("/signup", async (req, res) => {
  const { success, error } = signupSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: error.errors,
    });
  }

  const existingUser = await User.findOne({ username: req.body.username });

  if (existingUser) {
    return res.status(411).json({ message: "User already exists" });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  const token = jwt.sign({ id: user._id }, JWT_SECRET);

  // added the blance when the user siggned up.......
  await Account.create({
    userId: user._id,
    balance: 1 + Math.random() * 10000,
  });

  return res.json({ message: "User signed up successfully", token });
});

// Signin Schema Validation
const signinSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

// Signin Route
userRouter.post("/signin", async (req, res) => {
  const { success, error } = signinSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: error.errors,
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET);

  return res.json({ message: "User signed in successfully", token,user });
});

//body updating schema
const updateBody = zod.object({
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

userRouter.put("/update", userMiddleware, async (req, res) => {
  try {
    const { success } = updateBody.safeParse(req.body);

    if (!success) {
      return res.status(411).json({
        message: "Error while updating information",
      });
    }
    await User.updateOne({ _id: req.userId }, req.body);
    return res.json({
      message: "upadted successfully",
    });
  } catch (e) {
    return res.json({
      message: "error while upadting",
      error: e,
    });
  }
});

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    })),
  });
});

module.exports = userRouter;
