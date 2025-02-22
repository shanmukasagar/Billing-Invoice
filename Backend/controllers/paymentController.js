const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();
const {paymentObject} = require("../config/createPaymentObject");
const {connectDB, getDB} = require("../config/db");
const shortid = require('shortid');

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
const createOrder = async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;

    const options = {
      amount: amount * 100, // Razorpay accepts amount in paise
      currency,
      receipt,
    };

    const order = await razorpayInstance.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Verify Payment and Store in MongoDB
const verifyPayment = async (req, res) => {
  try {
    const userId = req.user.email;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, invoiceData } = req.body;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid Signature" });
    }
    // Fetch payment details
    const paymentDetails = await razorpayInstance.payments.fetch(razorpay_payment_id);
    const resultObj = await paymentObject(invoiceData, paymentDetails.id, paymentDetails.method, paymentDetails.status, userId);
    await connectDB();
    const db = getDB();
    const invoiceCollection = await db.collection("Invoice");
    const result = await invoiceCollection.insertOne(resultObj);
    if(result.acknowledged) {
      return res.status(200).json({ success: true, message: "Payment verified & invoice saved" });
    }
    return res.status(400).json({ success: false, message: "Payment Failure" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//Cash on delivery
const cashOnDelivery = async(req, res) => {
  try{
    const invoiceData = req.body;
    const userId = req.user.email;

    await connectDB();
    const db = getDB();
    const invoiceCollection = await db.collection("Invoice");

    const shortId = "pay_" + shortid.generate();
    const resultObj = await paymentObject(invoiceData, shortId, "COD", "captured", userId);

    const result = await invoiceCollection.insertOne(resultObj);
    if(result.acknowledged) {
      return res.status(200).json({ success: true, message: "Payment verified & invoice saved" });
    }
    return res.status(400).json({ success: false, message: "Payment Failure" });
  }
  catch(error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Get all transactions
const getTransactions = async(req, res) => {
  try{
    await connectDB();
    const db = await getDB();
    const invoiceCollection = await db.collection("Invoice");

    const result = await invoiceCollection.find({}, {
        txn_type: 1,
        sup_nm: 1,
        cus_nm: 1,
        "products.p_nm": 1,
        userId: 1,
        paid_amount: 1,
        "payment.txn_no": 1,
        date: 1,
        "payment.status": 1,
        "payment.txn_method": 1,
        _id: 0
    }).toArray();
    res.status(200).json(result);
  }
  catch(error) {
    res.status(500).json({success : false, message : "Internal Server Error"});
  }
}

module.exports = { createOrder, verifyPayment, cashOnDelivery, getTransactions };
