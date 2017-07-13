import React, {Component} from 'react';
import logo from '../../images/logo/logo.svg';
import { browserHistory } from 'react-router'

import './App.css';

import {Grid} from 'react-bootstrap';

class App extends Component {

    render() {

        return (
            <div className="App">
                <Grid>
                    <div className="App-header">
                        <img src={logo} className="App-logo pointer" alt="logo" onClick={() => this.onHomeClick()}/>
                        <h2>Welcome to The Movie Checker</h2>
                    </div>

                    {this.props.children}

                </Grid>
            </div>
        );
    }

    onHomeClick = () => {
        browserHistory.push('/')
    }
}

export default App;
