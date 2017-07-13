/**
 * Created by erik on 13-7-17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Grid, Row, Col, Image, Glyphicon, Thumbnail, Button} from 'react-bootstrap';
import {getMovieDetails, getMovieCredits} from './../../attributes/API.js';
import Moment from 'moment';
import { browserHistory } from 'react-router'

import {BASE_IMG_URL} from './../../attributes/constants'
import thumbnail from './../../images/thumbnails/no-image-available.png'

export default class MovieDetial extends Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            movie: {},
            credits: {}
        }
    }

    componentWillMount() {
        this.setState({loading: true});
        this.handleAllAsyncCalls(this.props.params.movieid);
    }

    render() {
        return (
            <div>
                {this.createMovieDetailComponent(this.state.movie)}
                {this.createCreditsComponent(this.state.credits)}
            </div>
        )
    }

    /**
     * Handle all async calls to the API and back
     * @param movieId
     */
    handleAllAsyncCalls = (movieId) => {

        Promise.all([
            getMovieDetails(movieId).then((movie) => {
                this.setState({movie: movie})
            }),
            getMovieCredits(movieId).then((credits) => {
                this.setState({credits: credits})
            }),


        ]).then((data) => {
            this.setState({loading: false})
        }).catch((err) => {
            this.handleFetchError(err)
        })
    }

    /**
     *
     * @param movie
     * @returns {XML}
     */
    createMovieDetailComponent = (movie) => {
        if (this.state.loading) {
            return;
        }

        const url = !movie.poster_path ? thumbnail : `${BASE_IMG_URL}/w300_and_h450_bestv2${movie.poster_path}`


        return (
            <Grid>
                <Row>
                    <Col xs={4} md={4}>
                        <Image src={url} rounded/>
                    </Col>
                    <Col xs={8} md={8}>
                        <Row>
                            <Col xs={10} md={10}>
                                <h2><strong>{movie.original_title}</strong> ({Moment(movie.release_date).format("YYYY")})</h2>
                            </Col>
                            <Col xs={2} md={2}>
                                <Button><i className="material-icons">star</i> {movie.vote_average}</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={10} md={10}>
                            <h3>Description</h3>
                            <p>{movie.overview}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={10} md={10}>
                                <h3>Genres</h3>
                                <p>{this.renderGenres(movie.genres)}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Button bsStyle="success" className="btn-raised">Watch Trailer</Button>
                        </Row>
                    </Col>
                </Row>
                <Row>

                </Row>
            </Grid>
        )
    }

    renderGenres = (genres) => {

        return genres.map((genre, index) => {

            return(
                <a onClick={() => this.onGenreClick(genre.id)}> {genre.name} </a>
            )
        })
    }

    onGenreClick = (genreId) => {
        browserHistory.push('/genre/' + genreId + '/movies')
    }


    /**
     *
     * @param credits
     */
    createCreditsComponent = (credits) => {

    }

    /**
     * Log the error and show a not found on screen
     * @param error
     */
    handleFetchError = (error) => {
        console.error(error)
    }
}

MovieDetial.propTypes = {
    movie: React.PropTypes.object.isRequired,
}