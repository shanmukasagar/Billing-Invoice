
const {getProductsDetails} = require("../services/formService")
//Get all products
const getAllProducts = async(req, res) => {
    try{
        const result = await getProductsDetails();
        res.status(200).json(result);
    }
    catch(error) {
        console.log("Error occcured in fetching all products")
        res.status(500).json("Internal Server Error");
    }
}

module.exports = {getAllProducts};