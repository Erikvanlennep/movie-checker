/**
 * Created by erik on 12-7-17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Col, Row, Button, Well, Image} from 'react-bootstrap';
import {browserHistory} from 'react-router'


import {BASE_IMG_URL} from '../../attributes/constants'
import thumbnail from '../../images/thumbnails/no-image-available.png'

import './movieList.css'
import logo from '../../images/logo/logo.svg';

export default class MovieList extends Component {

    constructor() {
        super();

    }

    render() {
        if (this.props.movies.results === undefined) {
            return (<img src={logo} className="App-logo" alt="logo"/>)
        }
        if (this.props.loading) {
            return (<img src={logo} className="App-logo" alt="logo"/>)
        }
        return (
            <row>
                {this.renderMovies(this.props.movies.results)}
            </row>
        )
    }

    renderMovies = (movies) => {
        let allMovies = [];

        movies.map((movie, index) => {

            const url = !movie.poster_path ? thumbnail : `${BASE_IMG_URL}/w138_and_h175_bestv2${movie.poster_path}`

            allMovies.push(
                <Col xs={6} md={4} key={index}>
                    <Well>
                        <Image className="thumbnail-image pointer" rounded src={url}
                               onClick={() => this.onMovieDetailButtonClick(movie.id)}/>
                        <h3 className="thumbnail-header">{movie.title}</h3>
                        <p className="thumbnail-text">{movie.overview}</p>
                        <Button bsStyle="info" bsSize="small" onClick={() => this.onMovieDetailButtonClick(movie.id)}>Read
                            more</Button>
                    </Well>
                </Col>
            )
        })

        console.log(this.props.genre)
        if (this.props.genre === undefined) {
            return (
                <div>
                    {allMovies}
                </div>
            )

        }
            return (
                <div>
                    <Row>
                        <Col xs={12} sm={12} md={12}>
                            <ul className="breadcrumb">
                                <li className="pointer"><a onClick={() => this.onHomeClick()}>Home</a></li>
                                <li className="active">Genre</li>
                                <li className="active">{this.props.genre}</li>
                            </ul>
                        </Col>
                    </Row>
                    {allMovies}
                </div>
            )
    }

    onMovieDetailButtonClick = (movieId) => {
        browserHistory.push('/movie/' + movieId);
    }

    onHomeClick = () => {
        browserHistory.push('/')
    }
}

MovieList.propTypes = {
    movies: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    genre: PropTypes.string
}