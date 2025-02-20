import { authActions, addNewUserActions } from "./actions";
import axios from 'axios';

export const authDataSuccess = (response) => {
    return { type: authActions.GET_AUTH_DATA_SUCCESS, payload: response}
};

export const authDataFailure = (error) => {
    let errorMessage = '';
    if (error.response && error.response.data) {
        errorMessage = error.response.data.message || error.response.data.error || "Unknown error occurred"; 
    } else {
        errorMessage = error.message; 
    }
    return { type: authActions.GET_AUTH_DATA_FAILURE, payload: errorMessage}
};

export const resetAuthDataError = () => {
    return { type: authActions.RESET_AUTH_DATA_ERROR}
};

export const getUserAuthentication = (reqBody) => { //Login functionality
    return function(dispatch) {
        axios.post("http://localhost:6001/api/auth/login", reqBody, { withCredentials: true }).then(response => {
            dispatch(authDataSuccess(response.data));
        })
        .catch(error => {
            dispatch(authDataFailure(error))
        })
    }
};

export const addNewUserSuccess = (response) => {
    return { type: addNewUserActions.ADD_NEW_USER_SUCCESS, payload:response}
}
export const addNewUserFailure = (error) => {
    let errorMessage = '';
    if (error.response && error.response.data) {
        errorMessage = error.response.data.message || error.response.data.error || "Unknown error occurred"; 
    } else {
        errorMessage = error.message; 
    }
    return { type: addNewUserActions.ADD_NEW_USER_FAILURE, payload: errorMessage}
}

export const resetAddNewUserError = () => {
    return { type: addNewUserActions.RESET_ADD_NEW_USER_ERROR}
}
export const addNewUser = (newUser) => { //Signup functionality
    return function(dispatch) {
        axios.post("http://localhost:6001/api/auth/signup", newUser, { withCredentials: true }).then(response => {
            dispatch(addNewUserSuccess(response.data));
        })
        .catch(error => {
            dispatch(addNewUserFailure(error));
        })
    }
}






