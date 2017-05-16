import {combineReducers} from "redux";
import {INVALIDATE_REDDIT, RECEIVE_POSTS, REQUEST_POSTS, SELECT_REDDIT} from "../actions/Actions";

const selectedReddit = (state = 'reactjs', action) => {
    switch (action.type) {
        case SELECT_REDDIT:
            return action.reddit
        default:
            return state
    }
};

const posts = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case REQUEST_POSTS:
            return {
                ...state,
                isFetching: true,
            }
        case RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            };
        default:
            return state
    }
};

const postsByReddit = (state = {}, action) => {
    switch (action.type) {
        case INVALIDATE_REDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return {
                ...state,
                [action.reddit]: posts(state[action.reddit], action)
            }
        default:
            return state
    }
};

const rootReducer = combineReducers({
    postsByReddit,
    selectedReddit
});


const diegoListHandler = (state, action) => {
    console.log("### Handling Diego list: putting into state");
    return state;
};

export default rootReducer
