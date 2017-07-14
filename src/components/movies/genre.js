/**
 * Created by erik on 13-7-17.
 */

import React, {Component} from 'react';
import {Col, Row, FormGroup, FormControl} from 'react-bootstrap';
import { browserHistory } from 'react-router';

import MovieList from '../list/movieList';

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
                <Row>
                    <Col xs={12} sm={12} md={12}>
                        <ul className="breadcrumb">
                            <li className="cursor-pointer"><a onClick={() => this.onHomeClick()}>Home</a></li>
                            <li className="active">Genre</li>
                            <li className="active">{this.props.params.genrename}</li>
                        </ul>
                    </Col>
                    <h1 className="text-center"> {this.props.params.genrename} </h1>
                </Row>
                <Row>
                    <Col sm={12}>
                        <MovieList
                            movies={this.state.movies}
                            loading={this.state.loading}/>
                    </Col>
                </Row>
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

    onHomeClick = () => {
        browserHistory.push('/')
    }

    /**
     * Log the error and show a not found on screen
     * @param error
     */
    handleFetchError = (error) => {
        console.error(error)
    }
}