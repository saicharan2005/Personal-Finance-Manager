const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({
      success: false,
      message: "unauthorised user!,no token",
    });
  //decode the token by passing the secrete key
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "unauthorised user!,invalid token",
    });
  }
};

module.exports = protect;
