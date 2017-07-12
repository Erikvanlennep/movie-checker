/**
 * Created by erik on 12-7-17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types';

export default class MovieList extends Component {

    constructor() {
        super();

    }

    render() {
        console.log(this.props.movies);
        if (this.props.movies.results === undefined) {
            return (<div>search for movies</div>)
        }
        return (
            <div>
                <h1>{this.props.movies.results[0].title}</h1>
                <p>{this.props.movies.results[0].overview}</p>
            </div>
        )


    }
}

MovieList.propTypes = {
    movies: React.PropTypes.object.isRequired,
}