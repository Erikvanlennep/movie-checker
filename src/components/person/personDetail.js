/**
 * Created by erik on 14-7-17.
 */

import React, {Component} from 'react'
import { Row, Col, Image, Panel} from 'react-bootstrap';
import {browserHistory} from 'react-router'
import {getPersonDetails, getPersonMovies} from './../../attributes/API.js';
import Moment from 'moment';

import logo from '../../images/logo/logo.svg';
import {BASE_IMG_URL} from './../../attributes/constants'
import thumbnail from './../../images/thumbnails/no-image-available.png'

/**
 * Component: Person
 * route("/person/{personid}/{personname}")
 * params ( personid, personname )
 */
export default class Person extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            person: {},
            movies: {}
        }
    }

    componentWillMount() {
        this.setState({loading: true});
        this.handleAllAsyncCalls(this.props.params.personid);
    }

    render() {
        if (this.state.loading) {
            return (<img src={logo} className="loader image-center" alt="logo"/>)
        }
        return (
            <div>
                {this.createPersonDetailComponent(this.state.person)}

                {this.createMoviesComponent(this.state.movies)}
            </div>
        )
    }

    /**
     * Handle all async calls to the API and back
     * @param personId
     */
    handleAllAsyncCalls = (personId) => {

        Promise.all([
            getPersonDetails(personId).then((person) => {
                this.setState({person: person})
            }),
            getPersonMovies(personId).then((movies) => {
                this.setState({movies: movies})
            }),


        ]).then((data) => {
            this.setState({loading: false})
        }).catch((err) => {
            this.handleFetchError(err)
        })
    }

    /**
     * Create Person Component
     * @param person
     * @returns {XML}
     */
    createPersonDetailComponent = (person) => {
        console.log(person);

        const url = !person.profile_path ? thumbnail : `${BASE_IMG_URL}/w300_and_h450_bestv2${person.profile_path}`

        // let gender = person.gender = 1 ? "female" : "male";

        return (
            <div>
                <Row>
                    <Col xs={12} sm={12} md={12}>
                        <ul className="breadcrumb">
                            <li className="cursor-pointer"><a onClick={() => this.onHomeClick()}>Home</a></li>
                            <li className="active">Person</li>
                            <li className="active">{person.name}</li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={5} md={4}>
                        <Image className="image-center no-image-holder w300_and_h450" src={url} rounded/>
                    </Col>
                    <Col xs={8} sm={7} md={8}>
                        <Row>
                            <Col xs={10}>
                                <h2><strong>{person.name}</strong> ({Moment(person.birthday).format("YYYY")})
                                </h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <h3>Biography</h3>
                                <p>{person.biography}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }

    /**
     * Create Known from component
     * @param movies
     * @returns {XML}
     */
    createMoviesComponent = (movies) => {
        let fullCast = [];

        movies.cast.map((movie, index) => {
            if (index >= 6) {
                return;
            }

            const url = !movie.poster_path ? thumbnail : `${BASE_IMG_URL}/w138_and_h175_bestv2${movie.poster_path}`

            fullCast.push(
                <Col xs={4} sm={5} md={3} lg={2} key={index}>
                    <Panel className="movie-detail-panel">
                        <Image className="image-center cursor-pointer no-image-holder w138_and_h175" rounded src={url} onClick={() => this.onMovieClick(movie)}/>
                        <h5>{movie.title}</h5>
                        <p><i>{movie.vote_average}</i></p>
                    </Panel>
                </Col>
            )
        })

        return (
            <div>
                <Row>
                    <h2>Known from</h2>
                    {fullCast}
                </Row>
            </div>
        )
    }

    /**OnClick Movie button
     *
     * @param movie
     */
    onMovieClick = (movie) => {
        browserHistory.push('/movie/' + movie.id + '/' + movie.title.replace(/ /g, "_"));
    }

    /**
     * OnClick home button
     */
    onHomeClick = () => {
        browserHistory.push('/')
    }
}