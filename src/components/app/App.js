import React, {Component} from 'react';
import logo from '../../images/logo/logo.svg';
import MovieList from './../movies/movieList';

import './App.css';

import {getSearchMovies} from './../../attributes/API.js'
import {Grid, Row, Col, Form, FormGroup, FormControl} from 'react-bootstrap';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            movies: {},
            loading: false,
            timeout: 0
        };
    }

    render() {

        return (
            <div className="App">
                <Grid>
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>Welcome to React</h2>
                    </div>
                    <Col md={5}>
                        <Form>
                            <FormGroup>
                                <FormControl type="text" placeholder="search" onChange={this.onSearchBoxChange}/>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col md={12}>
                        <MovieList movies={this.state.movies}/>
                    </Col>

                </Grid>
            </div>
        );
    }

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
                return;
            }

            Promise.all([
                getSearchMovies(this.state.name, 'en-US', 1).then((movies) => {
                    this.setState({movies: movies})
                    console.log(this.state.movies.results[0].overview);
                }),

            ]).then((data) => {
                this.setState({loading: false})
            }).catch((err) => {
                this.handleFetchError(err)
            })
        }, 1000)
    }

    /**
     * Log the error and show a not found on screen
     * @param error
     */
    handleFetchError = (error) => {
        console.error(error)
    }
}

export default App;
