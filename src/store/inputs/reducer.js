import { CHANGE_SINGLE_MOOD, SELECT_GENRE } from './actions'
const initialStore = {
    moodValues: {
        min_acousticness: 0,
        max_acousticness: 1.0,
        min_danceability: 0,
        max_danceability: 1.0,
        min_energy: 0,
        max_energy: 1.0,
        min_instrumentalness: 0,
        max_instrumentalness: 1.0,
        min_liveness: 0,
        max_liveness: 1.0,
        min_loudness: -60,
        max_loudness: 0,
        min_mode: 0,
        max_mode: 1.0,
        min_popularity: 0,
        max_popularity: 100,
        min_speechiness: 0,
        max_speechiness: 1.0,
        min_tempo: 0,
        max_tempo: 500,
        min_valence: 0,
        max_valence: 1.0
    },
    selectedGenres: []
}

export default function moodsReducer (state = initialStore, action) {
    switch(action.type) {
        case CHANGE_SINGLE_MOOD: {
            const names = action.moodName.split('-')
            const values = action.moodValue
            return {
                ...state,
                moodValues: {
                    ...state.moodValues,
                    [names[0].trim()]: values[0],
                    [names[1].trim()]: values[1]
                }
            }
        }

        case SELECT_GENRE: {
            return {
                ...state,
                selectedGenres: action.genres
            }
        }
        
        default:
            return state
    }
}
