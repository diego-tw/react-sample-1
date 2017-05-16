import React, {Component} from "react";
import "./App.css";
import RefreshButton from "./components/RefreshButton";
import KeysList from "./components/KeysList";
import logo from './logo.svg';


class App extends Component {






    render() {
        return (

            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <RefreshButton faIcon="plus" label="Add a new thing"/>
                <KeysList/>
            </div>

        );
    }
}

export default App;
