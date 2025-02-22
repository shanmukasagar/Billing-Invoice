import { combineReducers } from "redux";
import { authUserDataReducer, addNewUserReducer, authPageReducer } from "./userReducer";
import {getAllProductsReducer} from "./formReducer";
import {getTransactionReducer} from "./homeReducer"

export const rootReducer = combineReducers({
    authUserDataReducer,
    addNewUserReducer,
    getAllProductsReducer,
    getTransactionReducer,
    authPageReducer
});