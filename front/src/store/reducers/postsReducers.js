import {
    CREATE_POST_ERROR,
    CREATE_POST_REQUEST, CREATE_POST_SUCCESS,
    FETCH_POST_BY_ID_ERROR,
    FETCH_POST_BY_ID_REQUEST,
    FETCH_POST_BY_ID_SUCCESS, FETCH_POSTS_ERROR,
    FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS
} from "../actions/postsActions";


const initialState = {
    posts: [],
    loading:false,
    error: null,
    createError:null,
    post: null
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POST_BY_ID_REQUEST:
            return {...state};
        case FETCH_POST_BY_ID_SUCCESS:
            return {...state, post: action.post, error:null};
        case FETCH_POST_BY_ID_ERROR:
            return {...state, error: action.error};

        case FETCH_POSTS_REQUEST:
            return {...state, loading: true};
        case FETCH_POSTS_SUCCESS:
            return {...state, posts: action.posts, error:null, loading: false};
        case FETCH_POSTS_ERROR:
            return {...state, error: action.error, loading: false};

        case CREATE_POST_REQUEST:
            return {...state, loading: true};
        case CREATE_POST_SUCCESS:
            return {...state, createError:null, loading: false};
        case CREATE_POST_ERROR:
            return {...state, createError: action.error, loading: false};
        default:
            return state;
    }
};

export default postsReducer;