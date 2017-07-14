import React, {Component} from 'react';
import logo from '../../images/logo/logo.svg';
import { browserHistory } from 'react-router';
import {Grid, Col, Form, FormGroup, FormControl} from 'react-bootstrap';

import './App.css';
import './global.css'

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
                                        onChange={this.onSearchBoxChange}
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

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            if(event.target.value === ''){
                browserHistory.push('/')
            }else{
                browserHistory.push('/search/' + event.target.value)
            }


        }
    }

    /*
    onSearchBoxChange = (event) => {
        let value = event.target.value;

        clearTimeout(this.state.timeout);

        this.setState({loading: true});

        this.state.timeout = setTimeout(() => {
            this.setState({
                name: value
            })

            if (this.state.name === '') {
                this.setState({loading: false})
                this.getPopularMovies();
                return;
            }



            Promise.all([
                getSearchMovies(this.state.name, 'en-US', 1).then((movies) => {
                    this.setState({movies: movies})
                }),

            ]).then((data) => {
                this.setState({loading: false})
            }).catch((err) => {
                this.handleFetchError(err)
            })
        }, 1000)
    }
    */

    onHomeClick = () => {
        browserHistory.push('/')
    }
}

export default App;
