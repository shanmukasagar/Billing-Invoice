import { getProductActions } from "../actions/actions";

const productsState = {
    ProductAccounts : {},
    generalError : '',
}

export const getAllProductsReducer = (state = productsState, action) => {
    switch(action.type) {
        case getProductActions.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                generalError: "success",
                ProductAccounts: action.payload
            };
        case getProductActions.GET_PRODUCTS_FAILURE:
            return {
                ...state,
                generalError: action.payload,
                ProductAccounts: {},
            };
        default:
            return state;
    }
}