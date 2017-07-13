/**
 * Created by erik on 13-7-17.
 */

import React, {Component} from 'react';
import {Col, Form, FormGroup, FormControl} from 'react-bootstrap';

import MovieList from './movieList';

import {getSearchMovies, getPopularMovies} from './../../attributes/API.js';


export default class Home extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            movies: {},
            loading: false,
            timeout: 0
        };
    }

    componentDidMount() {
        this.getPopularMovies()
    }

    render() {
        return (
            <div>
                <Col sm={6} smOffset={3}>
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

                <Col sm={12}>
                    <MovieList movies={this.state.movies}/>
                </Col>
            </div>
        )
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    onSearchBoxChange = (event) => {
        event.preventDefault();
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
                }),

            ]).then((data) => {
                this.setState({loading: false})
            }).catch((err) => {
                this.handleFetchError(err)
            })
        }, 1000)
    }

    getPopularMovies = () => {
        Promise.all([
            getPopularMovies().then((movies) => {
                this.setState({movies: movies})
            }),

        ]).then((data) => {
            this.setState({loading: false})
        }).catch((err) => {
            this.handleFetchError(err)
        })
    }

    /**
     * Log the error and show a not found on screen
     * @param error
     */
    handleFetchError = (error) => {
        console.error(error)
    }
}