import config from "../config.js";
import jwt from "jsonwebtoken"; // Use `import` for ES module

const { JWT_SECRET } = config;

function userMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(400)
        .json({ message: "Authorization header is missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "Token is missing" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Token verification failed" });
    }

    req.userId = decoded.id;
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Token verification failed",
      error: e.message,
    });
  }
}

export { userMiddleware };
