/**
 * Created by erik on 13-7-17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Grid, Row, Col, Image, Well, Panel, Button} from 'react-bootstrap';
import {getMovieDetails, getMovieCredits} from './../../attributes/API.js';
import Moment from 'moment';
import { browserHistory } from 'react-router'

import './movieDetail.css'

import logo from '../../images/logo/logo.svg';
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
        if (this.state.loading) {
            return (<img src={logo} className="App-logo" alt="logo"/>)
        }
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

        const url = !movie.poster_path ? thumbnail : `${BASE_IMG_URL}/w300_and_h450_bestv2${movie.poster_path}`


        return (
            <div>
                <Row>
                    <Col xs={12} sm={5} md={4}>
                        <Image className="image-center" src={url} rounded/>
                    </Col>
                    <Col xs={8} sm={7} md={8}>
                        <Row>
                            <Col xs={10} sm={11} md={10}>
                                <h2><strong>{movie.original_title}</strong> ({Moment(movie.release_date).format("YYYY")})</h2>
                            </Col>
                            <Col xs={1} sm={2} md={1}>
                                <Button className="btn-primary"><i className="material-icons ">star</i> {movie.vote_average}</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={10} sm={10} md={10}>
                            <h3>Description</h3>
                            <p>{movie.overview}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={10} sm={10} md={10}>
                                <h3>Genres</h3>
                                <p>{this.renderGenres(movie.genres)}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>

                </Row>
            </div>
        )
    }

    renderGenres = (genres) => {

        return genres.map((genre, index) => {

            return(
                <a className="pointer" onClick={() => this.onGenreClick(genre.id)}> {genre.name} </a>
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
        let fullCast = [];

        credits.cast.map((cast, index) => {
            if(index >= 5){
                return;
            }

            const url = !cast.profile_path ? thumbnail : `${BASE_IMG_URL}/w138_and_h175_bestv2${cast.profile_path}`

            fullCast.push (
                <Col xs={4} sm={5} md={3} lg={2} key={index}>
                    <Panel className="movie-detail-panel">
                        <Image className="thumbnail-image pointer" rounded src={url}/>
                        <h5>{cast.character}</h5>
                        <p><i>{cast.name}</i></p>
                    </Panel>
                </Col>
            )
        })

        return(
            <Row>
                <h2>Cast</h2>
                {fullCast}
            </Row>
        )
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