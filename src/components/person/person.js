/**
 * Created by erik on 14-7-17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types';

import {Grid, Row, Col, Image, Well, Panel, Button} from 'react-bootstrap';
import {getPersonDetails} from './../../attributes/API.js';
import Moment from 'moment';
import {browserHistory} from 'react-router'

import logo from '../../images/logo/logo.svg';
import {BASE_IMG_URL} from './../../attributes/constants'
import thumbnail from './../../images/thumbnails/no-image-available.png'

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

                {/*{this.createCreditsComponent(this.state.credits)}*/}
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


        ]).then((data) => {
            this.setState({loading: false})
        }).catch((err) => {
            this.handleFetchError(err)
        })
    }


    createPersonDetailComponent = (person) => {
        console.log(person);

        const url = !person.profile_path ? thumbnail : `${BASE_IMG_URL}/w300_and_h450_bestv2${person.profile_path}`

        let gender = person.gender = 1 ? "female" : "male";

        // if(person.gender === 1){
        //     gender = "female"
        // }else{
        //     gender = "male"
        // }

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

    onHomeClick = () => {
        browserHistory.push('/')
    }
}