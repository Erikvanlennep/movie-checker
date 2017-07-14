/**
 * Created by erik on 13-7-17.
 */

import React, {Component} from 'react';
import {Col, Form, FormGroup, FormControl} from 'react-bootstrap';

import MovieList from './../home/movieList';

import {getMoviesByGenre} from './../../attributes/API.js';


export default class Genre extends Component {

    constructor() {
        super();
        this.state = {
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
                <Col sm={12}>
                    <MovieList
                        movies={this.state.movies}
                        loading={this.state.loading}
                    genre={this.props.params.genrename}/>
                </Col>
            </div>
        )
    }

    getPopularMovies = () => {
        Promise.all([
            getMoviesByGenre(this.props.params.genreid).then((movies) => {
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