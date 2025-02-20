const bcrypt = require("bcryptjs");
const { createUser, findUserByEmail } = require("../models/User");
const { generateToken } = require("../utils/jwtUtils");
const {connectDB, getDB} = require("../config/db");

// create User
const signup = async (req, res) => {
  const userData = req.body;
  try{
    // Check if user exists
    const existingUser = await findUserByEmail(userData);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await createUser(userData);
    if(newUser) {
      const token = generateToken(userData);
      res.cookie("token", token, { httpOnly: true, 
        secure: false 
      });
      return res.status(200).json(userData);
    }
    else{
      return res.status(400).json({message : "User Signup Failed"});
    }
  }
  catch(error) {
    return res.status(500).json({message : "Internal server error"});
  }
};

//User Login
const login = async (req, res) => {
  const userData = req.body;
  try{
    await connectDB();
    const db = getDB();
    const userCollection = await db.collection("Users");

    const userDocument = await userCollection.findOne({email : userData.email});
    if(!userDocument) {
      return res.status(400).json({"message" : "Invalid Credentials"});
    }
    const checkPassword = await bcrypt.compare(userData.pwd, userDocument.pwd);
    if(!checkPassword) {
      return res.status(400).json({message : "Invalid Credentials"});
    }
    const token = generateToken(userData);
    res.cookie("token", token, { httpOnly: true, 
      secure: false 
    });
    return res.status(200).json(userData);
  }
  catch(error) {
    return res.status(500).json({message : "Internal server error"});
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { signup, login, logout };
