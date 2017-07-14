import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, browserHistory } from 'react-router';

//components
import App from './components/app/App';
import Home from './components/home/home'
import movieDetail from './components/movie/movieDetail'
import genre from './components/movies/genre'
import search from './components/search/search'

//CSS
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.css'
import 'bootstrap-material-design/dist/css/ripples.min.css'




ReactDOM.render(
    <Router history={browserHistory}>
        <Route component={App}>
            <Route path="/" component={Home}/>
            <Route path="/search/:query" component={search}/>
            <Route path="/movie/:movieid" component={movieDetail} />
            <Route path="/genre/:genreid/:genrename" component={genre} />

        </Route>
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();
