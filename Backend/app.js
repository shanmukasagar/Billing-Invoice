const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require('cors');

const authRoutes = require("./routes/authRoutes");
const formRoutes = require("./routes/formRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();
const app = express();



app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Adjust this to your React app's URL
}));



app.use("/api/auth", authRoutes);
app.use("/api/form", formRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(process.env.PORT || 6001, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
