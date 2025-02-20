import { getTransactionActions } from "./actions";
import axios from 'axios';

export const transactionDataSuccess = (response) => {
    return { type: getTransactionActions.GET_TRANSACTION_SUCCESS, payload: response}
};

export const transactionDataFailure = (error) => {
    let errorMessage = '';
    if (error.response && error.response.data) {
        errorMessage = error.response.data || error.response.data.error || "Unknown error occurred"; 
    } else {
        errorMessage = error.message; 
    }
    return { type: getTransactionActions.GET_TRANSACTION_FAILURE, payload: errorMessage}
};

export const getAllTransactions = () => { //Get all transactions
    return function(dispatch) {
        axios.get("http://localhost:6001/api/payment/transactions").then(response => {
            dispatch(transactionDataSuccess(response.data));
        })
        .catch(error => {
            dispatch(transactionDataFailure(error))
        })
    }
};