/**
 * Created by erik on 14-7-17.
 */

import React, {Component} from 'react';
import {Col, Row, FormGroup, FormControl} from 'react-bootstrap';
import {browserHistory} from 'react-router'

import MovieList from '../list/movieList';

import {getSearchMovies} from './../../attributes/API.js';


export default class Home extends Component {

    constructor() {
        super();
        this.state = {
            name: null,
            movies: {},
            loading: false,
            timeout: 0
        };
    }

    componentDidMount() {

        // if(this.state.name !== this.props.params.query){
        //     this.forceUpdate();
        // }
        this.getMovies(this.props.params.query)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.params.query !== undefined){
            this.getMovies(nextProps.params.query)
        }
    }

    render() {
        return (
            <div>
                {console.log("test")}
                <Row>
                    <Col xs={12} sm={12} md={12}>
                        <ul className="breadcrumb">
                            <li className="cursor-pointer"><a onClick={() => this.onHomeClick()}>Home</a></li>
                            <li className="active">Search</li>
                            <li className="active">{this.state.name}</li>
                        </ul>
                    </Col>
                </Row>
                <h1>search: {this.state.name} </h1>
                <Col sm={12}>
                    <MovieList
                        movies={this.state.movies}
                        loading={this.state.loading}/>
                </Col>
            </div>
        )
    }

    getMovies = (query) => {
        // let query = this.props.params.query;
        this.setState({loading: true});

        this.setState({name: query})

        Promise.all([
            getSearchMovies(query, 'en-US', 1).then((movies) => {
                this.setState({movies: movies})
            }),

        ]).then((data) => {
            this.setState({loading: false})
        }).catch((err) => {
            this.handleFetchError(err)
        })
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

