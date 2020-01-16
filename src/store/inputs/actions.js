export const CHANGE_SINGLE_MOOD = "CHANGE_SINGLE_MOOD"
export const SELECT_GENRE = "SELECT_GENRE"
export const SEARCH_GENRE = "SEARCH_GENRE"

export function changeMood (moodName, moodValue) {
    return {
        type: CHANGE_SINGLE_MOOD,
        moodName,
        moodValue
    }
}

export function selectGenre (name) {
    return {
        type: SELECT_GENRE,
        name
    }
}

export function searchGenre (arr) {
    return {
        type: SEARCH_GENRE,
        arr
    }
}
