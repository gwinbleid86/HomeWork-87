import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';

export const FETCH_POST_BY_ID_REQUEST = 'FETCH_POST_BY_ID_REQUEST';
export const FETCH_POST_BY_ID_SUCCESS = 'FETCH_POST_BY_ID_SUCCESS';
export const FETCH_POST_BY_ID_ERROR = 'FETCH_POST_BY_ID_ERROR';

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_ERROR = 'CREATE_POST_ERROR';

export const createPostRequest = () => {return {type: CREATE_POST_REQUEST};};
export const createPostSuccess = () => ({type: CREATE_POST_SUCCESS});
export const createPostError = (error) => {return {type: CREATE_POST_ERROR, error};};

export const fetchPostByIdRequest = () => {return {type: FETCH_POST_BY_ID_REQUEST};};
export const fetchPostByIdSuccess = post => ({type: FETCH_POST_BY_ID_SUCCESS, post});
export const fetchPostByIdError = (error) => {return {type: FETCH_POST_BY_ID_ERROR, error};};

export const fetchPostsRequest = () => {return {type: FETCH_POSTS_REQUEST};};
export const fetchPostsSuccess = posts => ({type: FETCH_POSTS_SUCCESS, posts});
export const fetchPostsError = (error) => {return {type: FETCH_POSTS_ERROR, error};};

export const createPost = (postData) => {
    return async (dispatch, getState) => {
        try{
            const token = getState().users.user.token;
            const headers ={"Authorization" : "Token " + token};
            dispatch(createPostRequest());
            await axiosApi.post('/posts', postData, {headers});
            dispatch(createPostSuccess());
            dispatch(push('/'));
        }
        catch (error) {
            if(error.response){
                dispatch(createPostError(error.response.data));
            }
            else{
                dispatch(createPostError({global:"Network error or no internet"}));
            }
        }
    };
};

export const getPostById = (postId) => {
    return async dispatch => {
        try{
            dispatch(fetchPostByIdRequest());
            const response = await axiosApi.get('/posts/'+ postId);
            const post = response.data;
            dispatch(fetchPostByIdSuccess(post));
        }
        catch (e) {
            dispatch(fetchPostByIdError(e));
        }
    };
};

export const getPosts = () => {
    return async dispatch => {
        try{
            dispatch(fetchPostsRequest());
            const response = await axiosApi.get('/posts');
            const posts = response.data;
            dispatch(fetchPostsSuccess(posts));
        }
        catch (e) {
            dispatch(fetchPostsError(e));
        }
    };
};