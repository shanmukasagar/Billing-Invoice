# Online Grocery Store

## Overview
The Billing, Invoicing, and Indent Management System is designed to streamline financial transactions by accurately tracking payables and receivables. It supports both purchase transactions (where amounts are payable to suppliers or vendors) and sales transactions (where amounts are receivable from customers or consumers). The system records critical details such as transaction date, time, product or service information, pricing, taxes (GST/VAT), and payment terms. It enables seamless invoice generation, ensuring proper documentation of billing and shipping addresses and installment plans. Additionally, it supports multiple payment methods, offering flexibility for both buyers and suppliers. 

## Tech Stack
- **Frontend:**React.js, Redux, Material-UI, SCSS
- **Backend:** Node.js, Express.js, MongoDB
- **State Management:** Redux
- **Authentication:** JWT-based login & signup
- **Payment Gateway:** Razorpay integration

## Features
✅ Comprehensive Transaction Management – Supports both purchase (payable) and sales (receivable) transactions with accurate financial tracking.

✅ Automated Invoicing – Generates detailed invoices with transaction IDs, product/service details, pricing, and taxes.

✅ Tax Handling (GST/VAT) – Calculates central, state, and additional taxes, ensuring compliance with tax regulations.

✅ Flexible Payment Terms – Supports Net 30, Net 60, COD, and installment-based payments with discount and penalty options.

✅ Multi-Payment Support – Allows payments via bank transfer, credit card, UPI, COD, and online gateways.

✅ Billing & Shipping Details – Captures customer/vendor addresses, ensuring proper documentation for invoicing and delivery.

✅ Discounts & Late Payment Penalties – Enables early payment discounts and penalties for overdue payments.

✅ Real-Time Balance Tracking – Displays advance payments, remaining balance, and installment breakdown for easy tracking.

## Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/shanmukasagar/Billing-Invoice.git
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the backend directory and add:
```env
MONGO_URI=mongodb+srv://shanmukasagar:sagar%4005@cluster0.3bton.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
SECRET_KEY = 123456789
COOKIE_ENC_KEY = 0VvqL2NEgPr6vWQkUSyksiGcitH4Z9lk
PORT=6001
NODE_ENV = Development
RAZORPAY_KEY_ID = rzp_test_e5c3qatxS8khEn
RAZORPAY_KEY_SECRET = Wt56KKDA9n3rJARS8FKuUgkC

```

### 4️⃣ Run the Application
```sh
node app.js  # Start backend
npm run start  # Start frontend
```

## Razorpay Test Payment Details
Use the following test details to simulate payments:

### 🔹 Test UPI IDs
 In Razorpay's test mode, transactions cannot fail as all payments are automatically processed successfully. Failure responses can only be encountered in live mode, where actual banking systems validate transactions.
- `success@razorpay`  ✅ Success
- `failure@razorpay`  ❌ Failure

### 🔹 Test Card Details
If OTP asks give any 6 digit numbers for card payment
- **Card Number:** `4111 1111 1111 1111`
- **Expiry Date:** Any future date(12/25 example)
- **CVV:** `123`

## API Endpoints
| Method | Endpoint | Description |
|--------|-------------|----------------|
| POST | `/api/auth/signup` | User Signup |
| POST | `/api/auth/login` | User login |
| GET | `/api/form/produts` | Fetch products and accounts |
| POST | `/api/payment/create-order` | Place an order |
| POST | `/api/payment/verify-payment` | Verify Payment|
| POST | `/api/payment/cash-payment` | cash on delivery payment |
| GET | `/api/payment/transactions` | Fetch Transactions |



