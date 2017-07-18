/**
 * Created by erik on 12-7-17.
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Col, Button, Well, Image} from 'react-bootstrap';
import {hashHistory} from 'react-router'


import {BASE_IMG_URL} from '../../attributes/constants'
import thumbnail from '../../images/thumbnails/no-image-available.png'

import './movieList.css'
import logo from './../../images/logo/logo.svg';

/**
 * Component: MovieList
 * return a component of movies
 */
export default class MovieList extends Component {

    render() {
        if (this.props.movies.results === undefined) {
            return (<img src={logo} className="loader image-center" alt="logo"/>)
        }
        if (this.props.loading) {
            return (<img src={logo} className="loader image-center" alt="logo"/>)
        }
        return (
            <row>
                {this.renderMovies(this.props.movies.results)}
            </row>
        )
    }

    /**
     *  render the movies in a list
     * @param movies
     * @returns {XML}
     */
    renderMovies = (movies) => {
        let allMovies = [];

        movies.map((movie, index) => {
            
            const url = !movie.poster_path ? thumbnail : `${BASE_IMG_URL}/w138_and_h175_bestv2${movie.poster_path}`

            allMovies.push(
                <Col xs={6} md={4} key={index}>
                    <Well>
                        <Image className="image-center cursor-pointer no-image-holder w138_and_h175" rounded src={url}
                               onClick={() => this.onMovieDetailButtonClick(movie)}/>
                        <h3 className="thumbnail-header">{movie.title}</h3>
                        <p className="thumbnail-text">{movie.overview}</p>
                        <Button bsStyle="info" bsSize="small" onClick={() => this.onMovieDetailButtonClick(movie)}>Read
                            more</Button>
                    </Well>
                </Col>
            )
        })

        return ( <div>{allMovies} </div> )
    }

    /**
     * OnClick for details about a movie
     * @param movie
     */
    onMovieDetailButtonClick = (movie) => {
        hashHistory.push('/movie/' + movie.id + '/' + movie.title.replace(/ /g, "_"));
    }
}

MovieList.propTypes = {
    movies: PropTypes.object.isRequired,
    loading: PropTypes.bool
}