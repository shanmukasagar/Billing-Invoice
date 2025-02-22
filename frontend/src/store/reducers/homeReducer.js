import { getTransactionActions } from "../actions/actions";

const transactionState = {
    transactionData : [],
    generalError : '',
}

export const getTransactionReducer = (state = transactionState, action) => {
    switch(action.type) {
        case getTransactionActions.GET_TRANSACTION_SUCCESS:
            return {
                ...state,
                generalError: "success",
                transactionData: action.payload
            };
        case getTransactionActions.GET_TRANSACTION_FAILURE:
            return {
                ...state,
                generalError: action.payload,
                transactionData: [],
            };
        case getTransactionActions.RESET_TRANSACTION_AUTHENTICATION:
            return {
                ...state,
                generalError : '',
            };
        default:
            return state;
    }
}