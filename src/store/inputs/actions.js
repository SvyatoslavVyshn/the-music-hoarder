export const CHANGE_SINGLE_MOOD = "CHANGE_SINGLE_MOOD"
export const SELECT_GENRE = "SELECT_GENRE"

export function changeMood (moodName, moodValue) {
    return {
        type: CHANGE_SINGLE_MOOD,
        moodName,
        moodValue
    }
}

export function selectGenre (genres) {
    return {
        type: SELECT_GENRE,
        genres
    }
}
