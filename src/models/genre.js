/**
 * Created by erik on 17-7-17.
 */

/**
 * Genre model
 * @param genre
 * @returns {{id: *, name: *}}
 */
export function genre (genre)  {
    let id = genre.id;
    let name = genre.name;

    return {
        "id": id,
        "name": name,
    }
    
    
}