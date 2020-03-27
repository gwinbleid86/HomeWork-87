import axiosApi from "../../axiosApi";

export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_ERROR = 'FETCH_COMMENTS_ERROR';

export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_ERROR = 'CREATE_COMMENT_ERROR';

export const createCommentRequest = () => {return {type: CREATE_COMMENT_REQUEST};};
export const createCommentSuccess = (comment) => ({type: CREATE_COMMENT_SUCCESS, comment});
export const createCommentError = (error) => {return {type: CREATE_COMMENT_ERROR, error};};

export const fetchCommentsRequest = () => {return {type: FETCH_COMMENTS_REQUEST};};
export const fetchCommentsSuccess = comments => ({type: FETCH_COMMENTS_SUCCESS, comments});
export const fetchCommentsError = (error) => {return {type: FETCH_COMMENTS_ERROR, error};};

export const createComment = (commentData) => {
    return async (dispatch,getState) => {
        try{
            console.log(commentData);
            dispatch(createCommentRequest());
            const token = getState().users.user.token;
            const headers ={"Authorization" : "Token " + token};
            const comment = await axiosApi.post('/comments', commentData, {headers});
            dispatch(createCommentSuccess(comment.data));
        }
        catch (e) {
            dispatch(createCommentError(e));
        }
    };
};

export const getComments = (postId) => {
    return async dispatch => {
        try{
            dispatch(fetchCommentsRequest());
            const response = await axiosApi.get('/comments?post='+ postId);
            const albums = response.data;
            dispatch(fetchCommentsSuccess(albums));
        }
        catch (e) {
            dispatch(fetchCommentsError(e));
        }
    };
};