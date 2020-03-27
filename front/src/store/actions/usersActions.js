import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR';

export const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
export const registerUserSuccess = () => ({type: REGISTER_USER_SUCCESS});
export const registerUserError = (error) => {return {type: REGISTER_USER_ERROR, error};};

export const logoutUserRequest = () => ({type: LOGOUT_USER_REQUEST});
export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});
export const logoutUserError = (error) => {return {type: LOGOUT_USER_ERROR, error};};

export const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
export const loginUserSuccess = user=> ({type: LOGIN_USER_SUCCESS, user});
export const loginUserError = (error) => {return {type: LOGIN_USER_ERROR, error};};

export const logoutUser = () => {
    return async (dispatch, getState) => {
        try{
            dispatch(logoutUserRequest());
            const token = getState().users.user.token;
            const headers ={"Authorization" : "Token " + token};
            const response = await axiosApi.delete('/users/sessions', {headers});
            dispatch(logoutUserSuccess(response.data));
            dispatch(push('/'));
        }
        catch (error) {
            if(error.response){
                dispatch(logoutUserError(error.response.data));
            }
            else{
                dispatch(logoutUserError({global:"Network error or no internet"}));
            }
        }
    };
};

export const registerUser = userData => {
    return async dispatch => {
        try{
            dispatch(registerUserRequest());
            await axiosApi.post('/users', userData);
            dispatch(registerUserSuccess());
            dispatch(push('/'));
        }
        catch (error) {
            if(error.response){
                dispatch(registerUserError(error.response.data));
            }
            else{
                dispatch(registerUserError({global:"Network error or no internet"}));
            }
        }
    };
};

export const loginUser = userData => {
    return async dispatch => {
        try{
            dispatch(loginUserRequest());
            const response = await axiosApi.post('/users/sessions', userData);
            dispatch(loginUserSuccess(response.data));
            dispatch(push('/'));
        }
        catch (error) {
            if(error.response){
                dispatch(loginUserError(error.response.data));
            }
            else{
                dispatch(loginUserError({global:"Network error or no internet"}));
            }
        }
    };
};