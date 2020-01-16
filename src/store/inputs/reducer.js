import { CHANGE_SINGLE_MOOD, SELECT_GENRE } from './actions'
import genres from '../../data/genres'

const initialStore = {
    moodValues: {
        acousticness: 0,
        danceability: 0,
        energy: 0,
        instrumentalness: 0,
        liveness: 0,
        loudness: -60,
        mode: 0,
        popularity: 0,
        speechiness: 0,
        tempo: 0,
        valence: 0
    },
    genres,
    selectedGenres: []
}

export default function moodsReducer (state = initialStore, action) {
    switch(action.type) {
        case CHANGE_SINGLE_MOOD: {
            return {
                ...state,
                moodValues: {
                    ...state.moodValues,
                    [action.moodName]: action.moodValue
                }
            }
        }

        case SELECT_GENRE: {
            const newGenres = state.genres.slice()
            newGenres[action.index].checked = !newGenres[action.index].checked
            return {
                ...state,
                genres: newGenres,
                selectedGenres: newGenres.filter(genre => genre.checked)
            }
        }
        default:
            return state
    }
}
