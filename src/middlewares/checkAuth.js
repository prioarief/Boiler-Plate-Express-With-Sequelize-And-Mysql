const jwt = require("jsonwebtoken");
const {JWT_KEY} = process.env

module.exports = (req, res, next) => {
  let token = null;
  try {
    token = req.headers.authorization;
    const decoded = jwt.verify(token, JWT_KEY);
    req.decoded = decoded;
    req.token = token
    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return res.status(401).json({
        message: "Token Expired, Please login to get new token",
      });
    }
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};
