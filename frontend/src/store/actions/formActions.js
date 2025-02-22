import { getProductActions } from "./actions";
import axios from 'axios';

export const productsDataSuccess = (response) => {
    return { type: getProductActions.GET_PRODUCTS_SUCCESS, payload: response}
};

export const productsDataFailure = (error) => {
    let errorMessage = '';
    if (error.response && error.response.data) {
        errorMessage = error.response.data.message || error.response.data.error || "Unknown error occurred"; 
    } else {
        errorMessage = error.message; 
    }
    return { type: getProductActions.GET_PRODUCTS_FAILURE, payload: errorMessage}
};

export const resetProductsError = () => {
    return { type: getProductActions.RESET_PRODUCTS_AUTHENTICATION};
};

export const getAllProducts = () => { //Get all products
    return function(dispatch) {
        axios.get("http://localhost:6001/api/form/produts").then(response => {
            dispatch(productsDataSuccess(response.data));
        })
        .catch(error => {
            dispatch(productsDataFailure(error))
        })
    }
};