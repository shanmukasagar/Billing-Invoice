import axios from "axios";

export const createOrder = async (invoiceData) => { //Create order
    try{
        const response = await axios.post("http://localhost:6001/api/payment/create-order", invoiceData, { withCredentials: true });
        return response.data;
    }
    catch(error) {
        return error.response.data;
    }
    
};

export const verifyPayment = async (paymentData) => { //Verify payment
    try{
        const response = await axios.post("http://localhost:6001/api/payment/verify-payment", paymentData, { withCredentials: true });
        return response.data;
    }
    catch(error) {
        return error.response.data;
    }
};
 
export const cashOnPayment = async (invoiceData) => { //Cash on delivery
    try{
        const response = await axios.post("http://localhost:6001/api/payment/cash-payment", invoiceData, { withCredentials: true });
        return response.data;
    }
    catch(error) {
        return error.response.data;
    }
}
