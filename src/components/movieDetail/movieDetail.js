/**
 * Created by erik on 13-7-17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Grid, Row, Col, Image, Well, Panel, Button} from 'react-bootstrap';
import {getMovieDetails, getMovieCredits} from './../../attributes/API.js';
import Moment from 'moment';
import {browserHistory} from 'react-router'

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
            return (<img src={logo} className="loader image-center" alt="logo"/>)
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
                    <Col xs={12} sm={12} md={12}>
                        <ul className="breadcrumb">
                            <li className="cursor-pointer"><a onClick={() => this.onHomeClick()}>Home</a></li>
                            <li className="active">Movie</li>
                            <li className="active">{movie.original_title}</li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={5} md={4}>
                        <Image className="image-center no-image-holder w300_and_h450" src={url} rounded/>
                    </Col>
                    <Col xs={8} sm={7} md={8}>
                        <Row>
                            <Col xs={10} sm={11} md={10}>
                                <h2><strong>{movie.original_title}</strong> ({Moment(movie.release_date).format("YYYY")})
                                </h2>
                            </Col>
                            <Col xs={1} sm={2} md={1}>
                                <Button className="btn-primary cursor-normal">
                                    <i className="material-icons ">star</i> {movie.vote_average}
                                </Button>
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

            return (
                <a className="cursor-pointer" onClick={() => this.onGenreClick(genre)}> {genre.name} </a>
            )
        })
    }

    onGenreClick = (genre) => {
        browserHistory.push('/genre/' + genre.id + '/' + genre.name)
    }


    /**
     *
     * @param credits
     */
    createCreditsComponent = (credits) => {
        let fullCast = [];

        credits.cast.map((cast, index) => {
            if (index >= 6) {
                return;
            }

            const url = !cast.profile_path ? thumbnail : `${BASE_IMG_URL}/w138_and_h175_bestv2${cast.profile_path}`

            fullCast.push(
                <Col xs={4} sm={5} md={3} lg={2} key={index}>
                    <Panel className="movie-detail-panel">
                        <Image className="image-center cursor-pointer" rounded src={url}/>
                        <h5>{cast.character}</h5>
                        <p><i>{cast.name}</i></p>
                    </Panel>
                </Col>
            )
        })

        return (
            <div>
                <Row>
                    <h2>Cast</h2>
                    {fullCast}

                </Row>
                <Row>
                    <Button>Show Full cast</Button>
                </Row>
            </div>
        )
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

MovieDetial.propTypes = {
    movie: React.PropTypes.object.isRequired,
}