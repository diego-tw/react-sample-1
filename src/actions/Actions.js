export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'
export const PROCESS_DIEGO_LIST = 'PROCESS_DIEGO_LIST'



export const invalidateReddit = reddit => ({
    type: INVALIDATE_REDDIT,
    reddit
});

export const requestPosts = reddit => ({
    type: REQUEST_POSTS,
    reddit
});

export const receivePosts = (reddit, json) => ({
    type: RECEIVE_POSTS,
    reddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
});

export const fetchPosts = reddit => dispatch => {
    dispatch(requestPosts(reddit));
    return fetch(`https://www.reddit.com/r/reactjs.json`)
        .then(response => response.json())
        .then(json => dispatch(receivePosts(reddit, json)))
};

export const fetchDiegoList = () => dispatch => {
    console.log("### fetchDiegoList");
    return fetch(`https://www.reddit.com/r/reactjs.json`)
        .then(response => response.json())
        .then(json => dispatch(processDiegoList(json)))
};

export const processDiegoList = json => ({
    type: PROCESS_DIEGO_LIST,
    diegoList: json.data.children.map(child => child.data),
    receivedAt: Date.now()
});
