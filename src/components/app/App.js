import React, {Component} from 'react';
import logo from '../../images/logo/logo.svg';
import './App.css';

import {Grid, Row, Col, Form, FormGroup, FormControl} from 'react-bootstrap';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            loading: false,
            timeout: 0
        };
    }

    render() {
        return (
            <div className="App">
                <Grid>
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>Welcome to React</h2>
                    </div>
                    <Col md={5}>
                        <Form>
                            <FormGroup>
                                <FormControl type="text" placeholder="search" onChange={this.onSearchBoxChange}/>
                            </FormGroup>
                        </Form>
                    </Col>
                    <h2>{this.state.name}</h2>

                </Grid>
            </div>
        );
    }

    onSearchBoxChange = (event) => {
        let value = event.target.value;

        clearTimeout(this.state.timeout);

        // this.setState(previousState => {
        //     return {loading: !previousState.loading};
        // });

        this.state.timeout = setTimeout(() => {
            this.setState({
                name: value
            })
        }, 500)
    }
}

export default App;
