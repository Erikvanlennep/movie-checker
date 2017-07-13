/**
 * Created by erik on 12-7-17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Col, Thumbnail, Button, Well, Image} from 'react-bootstrap';
import { browserHistory } from 'react-router'


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
        return (
            <row>
                {this.renderMovies(this.props.movies.results)}
            </row>
        )
    }

    renderMovies = (movies) => {
        return movies.map((movie, index) => {

            const url = !movie.poster_path ? thumbnail : `${BASE_IMG_URL}/w138_and_h175_bestv2${movie.poster_path}`

            return (
                <Col xs={6} md={4} key={index}>
                    <Well>
                        <Image className="thumbnail-image pointer" rounded src={url} onClick={() => this.onMovieDetailButtonClick(movie.id)}/>
                        <h3 className="thumbnail-header">{movie.title}</h3>
                        <p className="thumbnail-text">{movie.overview}</p>
                        <Button bsStyle="info" bsSize="small" onClick={() => this.onMovieDetailButtonClick(movie.id)}>Read more</Button>
                    </Well>
                </Col>
            )
        })
    }

    onMovieDetailButtonClick = (movieId) => {
        browserHistory.push('/movie/' + movieId);
    }
}

MovieList.propTypes = {
    movies: React.PropTypes.object.isRequired,
}