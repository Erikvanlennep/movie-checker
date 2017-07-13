/**
 * Created by erik on 12-7-17.
 */

import {BASE_URL, API_KEY} from './constants.js'

/**
 * get Latest movies
 * @returns {Promise.<TResult>}
 */
export function getPopularMovies() {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`

    return fetch(url)
        .then(handleRestResponse)
        .then((response) => response)
}

/**
 * Get a single movie with its details
 * @param movieId
 * @returns {Promise.<TResult>}
 */
export function getMovieDetails(movieId, language) {
    if(language === null){ language = 'en-US' }

    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${language}`;

    return fetch(url)
        .then(handleRestResponse)
        .then((response) => response)
}

export function getSearchMovies(searchString, language, page){
    if(page === null){ page = 1 }

    if(language === null){ language = 'en-US' }

    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=${language}&query=${searchString}&page=${page}`;

    return fetch(url)
        .then(handleRestResponse)
        .then((response) => response)
}

export function getMovieCredits(movieId) {

    const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;

    return fetch(url)
        .then(handleRestResponse)
        .then((response) => response)
}

/**
 * create a json or return a error with statuscode
 * @param response
 * @returns {*}
 */
function handleRestResponse(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response.json())
    } else {
        return Promise.resolve(response.json())
            .then(message => {
                const error = new Error(`${message.message} (code ${message.statusCode})`);
                error.status = response.status
                error.statusCode = message.statusCode

                throw error
            })
    }
}