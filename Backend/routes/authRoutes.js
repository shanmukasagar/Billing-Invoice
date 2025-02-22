const express = require("express");
const { signup, login, authenticatePage } = require("../controllers/authController");
const {loginLimiter} = require("../middlewares/loginLimitter");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", loginLimiter, login);
router.get("/verify-page", authenticatePage);

module.exports = router;
