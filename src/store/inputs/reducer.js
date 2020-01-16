import { CHANGE_SINGLE_MOOD, SELECT_GENRE, SEARCH_GENRE } from './actions'
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
            const selected = newGenres.find(genre => genre.label === action.name)
            selected.checked = !selected.checked
            return {
                ...state,
                genres: newGenres,
                selectedGenres: newGenres.filter(genre => genre.checked)
            }
        }

        case SEARCH_GENRE: {
            const newGenres = genres.filter( genre => {
               if(action.arr.length > 0) {
                return action.arr.find(item => item.label === genre.label)
               }
               return genres
            } )
            return {
                ...state,
                genres: newGenres
            }
        }
        default:
            return state
    }
}
