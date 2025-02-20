import { combineReducers } from "redux";
import { authUserDataReducer, addNewUserReducer, } from "./userReducer";
import {getAllProductsReducer} from "./formReducer";
import {getTransactionReducer} from "./homeReducer"

export const rootReducer = combineReducers({
    authUserDataReducer,
    addNewUserReducer,
    getAllProductsReducer,
    getTransactionReducer
});