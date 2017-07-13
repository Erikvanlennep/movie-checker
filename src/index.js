import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, browserHistory } from 'react-router';

//components
import App from './components/app/App';
import Home from './components/home/home'
import movieDetail from './components/movie/movieDetail'

//CSS
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';



ReactDOM.render(
    <Router history={browserHistory}>
        <Route component={App}>
            <Route path="/" component={Home}/>
            <Route path="/movie/:movieid" component={movieDetail} />

        </Route>
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();
