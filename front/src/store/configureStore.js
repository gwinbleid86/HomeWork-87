import {createBrowserHistory} from "history";
import {loadFromLocalStorage, localStorageMiddleware} from "./localStorage";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import usersReducer from "./reducers/usersReducers";
import postsReducer from "./reducers/postsReducers";
import commentsReducer from "./reducers/commentsReducers";
import thunkMiddleware from "redux-thunk";

export const history = createBrowserHistory();
const persistedState = loadFromLocalStorage();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    router: connectRouter(history),
    users: usersReducer,
    posts:postsReducer,
    comments:commentsReducer
});

const middleware = [
    thunkMiddleware,
    routerMiddleware(history),
    localStorageMiddleware
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer,persistedState, enhancers);

export default store;