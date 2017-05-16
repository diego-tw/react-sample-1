import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {fetchDiegoList, invalidateReddit, fetchPosts, selectReddit} from "./actions/Actions";
import Posts from "./components/Posts";
import logo from "./logo.svg";


class App extends Component {
    static propTypes = {
        selectedReddit: PropTypes.string.isRequired,
        diegoList: PropTypes.array.isRequired,
        posts: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const {dispatch, selectedReddit} = this.props;
        dispatch(fetchPosts(selectedReddit))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedReddit !== this.props.selectedReddit) {
            const {dispatch, selectedReddit} = nextProps;
            dispatch(fetchPosts(selectedReddit))
        }
    }

    handleChange = nextReddit => {
        this.props.dispatch(selectReddit(nextReddit))
    };

    handleRefreshClick = e => {

        e.preventDefault();
        const {dispatch, selectedReddit} = this.props;

        dispatch(invalidateReddit(selectedReddit));
        dispatch(fetchPosts(selectedReddit))
        dispatch(fetchDiegoList());
    };

    render() {
        const {selectedReddit, posts, isFetching, lastUpdated} = this.props;
        const isEmpty = posts.length === 0;
        return (


            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" width={100}/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    Here'es a list...
                </p>

                {isEmpty
                    ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                    : <div style={{opacity: isFetching ? 0.5 : 1}}>
                        <Posts posts={posts}/>
                    </div>
                }
                <p>
                    {lastUpdated &&
                    <span>
                        Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                        {' '}
                    </span>
                    }
                    {!isFetching &&
                    <a href="#"
                       onClick={this.handleRefreshClick}>
                        Refresh
                    </a>
                    }
                </p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {selectedReddit, postsByReddit} = state;
    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsByReddit[selectedReddit] || {
        isFetching: true,
        items: []
    };

    return {
        selectedReddit,
        posts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(App)
