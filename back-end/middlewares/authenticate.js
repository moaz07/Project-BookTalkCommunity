const jwt = require("jsonwebtoken");

const User = require("../entities/User");

// Middleware to verify JWT token
const isAuth = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "process.env.privateKey");

    if (!decoded) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = await User.findById(decoded.userId);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = isAuth;
