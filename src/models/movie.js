/**
 * Created by erik on 17-7-17.
 */

export function movie (movie)  {
    let id = movie.id;
    let title = movie.title;
    let rating = movie.vote_avarage;
    let poster = movie.poster_path;
    let description = movie.overview;
    let date = movie.release_date;
    let genres = movie.genre_ids;

    return {
        "id": id,
        "title": title,
        "vote_average": rating,
        "poster_path": poster,
        "overview": description,
        "release_date": date,
        "genre_ids": genres,
    }
}