import {
    CREATE_COMMENT_ERROR,
    CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS,
    FETCH_COMMENTS_ERROR,
    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCESS
} from "../actions/commentsActions";


const initialState = {
    comments: [],
    loading:false,
    error: null,
    createError:null,
    createLoading:false
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_COMMENTS_REQUEST:
            return {...state, loading: true};
        case FETCH_COMMENTS_SUCCESS:
            return {...state, comments: action.comments, error:null, loading: false};
        case FETCH_COMMENTS_ERROR:
            return {...state, error: action.error, loading: false};

        case CREATE_COMMENT_REQUEST:
            return {...state, createLoading: true};
        case CREATE_COMMENT_SUCCESS:
            const comments = [...state.comments];
            comments.unshift(action.comment);
            return {...state, createError:null,comments:comments, createLoading: false};
        case CREATE_COMMENT_ERROR:
            return {...state, createError: action.error, createLoading: false};
        default:
            return state;
    }
};

export default commentsReducer;