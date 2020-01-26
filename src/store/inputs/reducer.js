import { CHANGE_SINGLE_MOOD, SELECT_GENRE } from './actions'
const initialStore = {
    moodValues: {
        target_acousticness: 0,
        target_danceability: 0,
        target_energy: 0,
        target_instrumentalness: 0,
        target_mode: 0,
        target_popularity: 0,
        target_tempo: 0,
        target_valence: 0
    },
    selectedGenres: []
}

export default function moodsReducer (state = initialStore, action) {
    switch(action.type) {
        case CHANGE_SINGLE_MOOD: {
            const { moodName, moodValue } = action
            return {
                ...state,
                moodValues: {
                    ...state.moodValues,
                    [moodName]: moodValue
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
