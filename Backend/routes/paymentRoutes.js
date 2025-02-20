const express = require("express");
const { createOrder, verifyPayment, cashOnDelivery, getTransactions } = require("../controllers/paymentController");
const {authenticateToken} = require("../middlewares/authMiddleware")

const router = express.Router();

router.post("/create-order", authenticateToken, createOrder);
router.post("/verify-payment", authenticateToken, verifyPayment);
router.post("/cash-payment", authenticateToken, cashOnDelivery);
router.get("/transactions", getTransactions);

module.exports = router;
