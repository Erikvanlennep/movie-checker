/**
 * Created by erik on 17-7-17.
 */

/**
 * Person model
 * @param person
 * @returns {{id: *, name: *, vote_average: *, profile_image: *, biography, birthday, gender}}
 */
export function person (person)  {
    let id = person.id;
    let name = person.name;
    let profile_image = person.profile_path;
    let biography = person.biography;
    let birthday = person.birthday;
    let gender = person.gender;

    return {
        "id": id,
        "name": name,
        "vote_average": rating,
        "profile_image": profile_image,
        "biography": biography,
        "birthday": birthday,
        "gender": gender,
    }
}