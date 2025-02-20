const {connectDB, getDB} = require("../config/db");

//Get all products
const getProductsDetails = async() => {
    try{
        await connectDB();
        const db = getDB();
        const accountsCollection = await db.collection("Accounts");
        const productsCollection = await db.collection("Products");

        const accountsData = await accountsCollection.find({}).toArray();
        const productsData = await productsCollection.find({}).toArray();

        return {accounts : accountsData, products : productsData};
    }
    catch(error){
        throw error;
    }
}

module.exports = {getProductsDetails};