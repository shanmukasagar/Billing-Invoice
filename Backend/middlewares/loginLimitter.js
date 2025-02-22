const rateLimit = require("express-rate-limit");

// Rate limiter middleware
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: "Too many login attempts. Please try again later.",
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false, // Disable legacy headers
});

module.exports = {loginLimiter};