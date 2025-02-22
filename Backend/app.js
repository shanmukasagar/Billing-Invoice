const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require('cors');
const mongoSanitize = require("mongo-sanitize");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");
const formRoutes = require("./routes/formRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();
const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://checkout.razorpay.com", //  Allow Razorpay scripts
          "'unsafe-inline'", //  Required for inline scripts
          "'unsafe-eval'",   // Required for certain Razorpay functionalities
        ],
        frameSrc: ["'self'", "https://api.razorpay.com"], //  Allow Razorpay iframe
        connectSrc: ["'self'", "https://api.razorpay.com"], //  Allow API requests
        imgSrc: ["'self'", "data:", "https://*.razorpay.com"], //  Allow Razorpay images
      },
    },
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Adjust this to your React app's URL
}));

// Global Middleware: Sanitize all incoming requests
app.use((req, res, next) => {
    req.body = mongoSanitize(req.body);
    req.query = mongoSanitize(req.query);
    req.params = mongoSanitize(req.params);
    next();
});

app.use("/api/auth", authRoutes);
app.use("/api/form", formRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(process.env.PORT || 6001, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
