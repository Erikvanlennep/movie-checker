/**
 * Created by erik on 12-7-17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Grid, Row, Col, Well, Jumbotron, Thumbnail, Button} from 'react-bootstrap';

import {BASE_IMG_URL} from './../../attributes/constants'
import thumbnail from './../../images/thumbnails/no-image-available.png'

import './movieList.css'

export default class MovieList extends Component {

    constructor() {
        super();

    }

    render() {
        console.log(this.props.movies);
        if (this.props.movies.results === undefined) {
            return (<div>No movies found</div>)
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
                <Col xs={6} md={4}>
                    <Thumbnail src={url} alt="242x200">
                        <h3 className="thumbnail-header">{movie.title}</h3>
                        <p className="thumbnail-text">{movie.overview}</p>
                        <Button bsStyle="info" bsSize="small">Read more</Button>
                    </Thumbnail>
                </Col>
            )
        })

    }
}

MovieList.propTypes = {
    movies: React.PropTypes.object.isRequired,
}