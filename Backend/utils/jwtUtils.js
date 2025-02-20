const jwt = require("jsonwebtoken");

//Generate token
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.SECRET_KEY, { expiresIn: "1h" });
};
//Verify token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

module.exports = { generateToken, verifyToken };
