import {
    LOGIN_USER_ERROR,
    LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER_ERROR, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS,
    REGISTER_USER_ERROR,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from "../actions/usersActions";

const initialState = {
    registerLoading:false,
    registerError: null,
    user:null,
    loginLoading:false,
    loginError: null,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {...state, registerLoading: true};
        case REGISTER_USER_SUCCESS:
            return {...state, registerError:null, registerLoading: false};
        case REGISTER_USER_ERROR:
            return {...state, registerError: action.error, registerLoading: false};

        case LOGIN_USER_REQUEST:
            return {...state, loginLoading: true};
        case LOGIN_USER_SUCCESS:
            return {...state, loginError:null, loginLoading: false, user: action.user};
        case LOGIN_USER_ERROR:
            return {...state, loginError: action.error, loginLoading: false};

        case LOGOUT_USER_REQUEST:
            return {...state, loginLoading: true};
        case LOGOUT_USER_SUCCESS:
            return {...state, loginError:null, loginLoading: false, user: null};
        case LOGOUT_USER_ERROR:
            return {...state, loginError: action.error, loginLoading: false};
        default:
            return state;
    }
};

export default usersReducer;