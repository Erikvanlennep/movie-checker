import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
// import registerServiceWorker from './registerServiceWorker';


//components
import App from './components/app/App';
import Home from './components/home/home'
import movieDetail from './components/movie/movieDetail'
import genre from './components/movie/genre'
import search from './components/search/search'
import person from './components/person/personDetail'

//CSS
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.css'
import 'bootstrap-material-design/dist/css/ripples.min.css'


ReactDOM.render(
    <Router history={hashHistory}>
        <Route component={App}>
            <Route path="/" component={Home}/>
            <Route path="/search/:query" component={search}/>
            <Route path="/movie/:movieid/:moviename" component={movieDetail} />
            <Route path="/genre/:genreid/:genrename" component={genre} />
            <Route path="/person/:personid/:personname" component={person} />

        </Route>
    </Router>,
    document.getElementById('root')
);

// registerServiceWorker();
