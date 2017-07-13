/**
 * Created by erik on 13-7-17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Grid, Row, Col, Image, Jumbotron, Thumbnail, Button} from 'react-bootstrap';
import {getMovieDetails, getMovieCredits} from './../../attributes/API.js';

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
                        <h2><strong>{movie.original_title}</strong> ({movie.release_date})</h2>
                </Row>
                <Row>
                    <Col xs={4} md={4}>
                        <Image src={url} rounded/>
                    </Col>
                    <Col xs={8} md={8}>
                        <div>


                        </div>
                    </Col>
                </Row>
            </Grid>
        )
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