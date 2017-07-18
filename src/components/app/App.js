/**
 * Created by erik on 13-7-17.
 */

import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import {Grid, Col, Form, FormGroup, FormControl} from 'react-bootstrap';

import './App.css';
import './global.css';

import logo from '../../images/logo/logo.svg';

class App extends Component {

    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <div className="App">
                <Grid>

                    <div className="App-header">
                        <Col sm={1}>
                        <img src={logo} className="App-logo cursor-pointer" alt="logo" onClick={() => this.onHomeClick()}/>
                        </Col>

                        <Col sm={6} smOffset={2}>
                            <h2 className="App-intro">Welcome to The Movie Checker</h2>
                            <Form>
                                <FormGroup>
                                    <FormControl
                                        type="text"
                                        placeholder="search for movies"
                                        onKeyPress={this.handleKeyPress}/>
                                </FormGroup>
                            </Form>
                        </Col>
                    </div>

                    {this.props.children}

                </Grid>
            </div>
        );
    }

    /**
     * Do on key press
     * @param event
     */
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            if(event.target.value === ''){
                hashHistory.push('/')
            }else{
                hashHistory.push('/search/' + event.target.value)
            }


        }
    }

    /**
     * OnClick home button
     */
    onHomeClick = () => {
        hashHistory.push('/')
    }
}

export default App;
