import { authActions, addNewUserActions } from "../actions/actions";

const authState = {
    authUser : {},
    generalError : '',
    isAuthenticated : false
}

export const authUserDataReducer = (state = authState, action) => {
    switch(action.type) {
        case authActions.GET_AUTH_DATA_SUCCESS:
            return {
                ...state,
                generalError: "success",
                isAuthenticated : true,
                authUser: action.payload
            };
        case authActions.GET_AUTH_DATA_FAILURE:
            return {
                ...state,
                generalError: action.payload,
                authUser: {},
            };
        case authActions.RESET_AUTH_DATA_ERROR:
            return {
                ...state,
                authUser: {},
                isAuthenticated : false,
                generalError: ''
            }
        default:
            return state;
    }
}

export const addNewUserReducer = (state = authState, action) => {
    switch(action.type) {
        case addNewUserActions.ADD_NEW_USER_SUCCESS:
            return {
                ...state,
                 generalError: 'success',
                 authUser: action.payload,
                isAuthenticated : true
               
            }
        case addNewUserActions.ADD_NEW_USER_FAILURE:
            return {
                ...state,
                authUser:{},
                generalError:action.payload
            }
        case addNewUserActions.RESET_ADD_NEW_USER_ERROR:
            return {
                ...state,
                authUser:{},
                isAuthenticated : false,
                generalError:''
            }
        default:
            return state;
    }
}