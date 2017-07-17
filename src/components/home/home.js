/**
 * Created by erik on 13-7-17.
 */

import React, {Component} from 'react';
import {Col} from 'react-bootstrap';

import MovieList from '../list/movieList';

import {getPopularMovies} from './../../attributes/API.js';

/**
 * Component: Home
 * route("/")
 */
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
        this.getMovies()
    }

    render() {
        return (
            <div>
                <Col sm={12}>
                    <MovieList
                        movies={this.state.movies}
                        loading={this.state.loading}/>
                </Col>
            </div>
        )
    }

    /**
     * Get all popular movies
     * return movies
     */
    getMovies = () => {
        this.setState({loading: true});

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

