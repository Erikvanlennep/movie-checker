/**
 * Created by erik on 14-7-17.
 */

import React, {Component} from 'react';
import {Col, Form, FormGroup, FormControl} from 'react-bootstrap';

import MovieList from './../home/movieList';

import {getSearchMovies} from './../../attributes/API.js';


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

    getMovies = () => {
        this.setState({loading: true});

        Promise.all([
            getSearchMovies(this.props.params.query, 'en-US', 1).then((movies) => {
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

