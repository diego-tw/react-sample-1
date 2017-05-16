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

export const processDiegoList = json => ({
    type: PROCESS_DIEGO_LIST,
    diegoList: json.data.children.map(child => child.data),
    receivedAt: Date.now()
});

export const fetchDiegoList = () => dispatch => {
    console.log("### fetchDiegoList");

    // var response = fetch(`http://test-gateway.timbres.technology/services/rest/search/recents`, {mode: 'no-cors'});
    // if (response.ok) {
    //     // A 200-299 response status
    //     return response.then(response => response.json()).then(json => dispatch(processDiegoList(json)));
    // } else {
    //     response.json().then(console.log("### HTTP Response error"));
    // }

    return fetch(`http://test-gateway.timbres.technology/services/rest/search/recents`, {mode: 'no-cors'})
        .then(response => response.json())
        .then(json => dispatch(processDiegoList(json)))
};


