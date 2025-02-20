const bcrypt = require("bcryptjs");
const {connectDB, getDB} = require("../config/db");
//Create User 
const createUser = async (userData) => {
    await connectDB();
    const db = getDB();
    const userCollection = await db.collection("Users");


    userData.pwd = await bcrypt.hash(userData.pwd, 10);

    const user = {
        u_nm: userData.u_nm,
        email: userData.email,
        pwd: userData.pwd,
    };

    const result = await userCollection.insertOne(user);
    if(result.acknowledged) {
        return true;
    }
    return false;
};
//Check user exist
const findUserByEmail = async (userData) => {
    await connectDB();
    const db = getDB();
    const userCollection = await db.collection("Users");
    const result = await userCollection.findOne({email : userData.email});
    if(result) {
        return true;
    }
    return false;
};

module.exports = { createUser, findUserByEmail };
