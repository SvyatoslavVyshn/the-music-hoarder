import { GET_PLAYLIST } from './actions'
import { FULFILLED } from '../../constants'

import { handleRequestStates } from '../../utils'

const initialStore = {
    pending: false,
    tracks: []
}

export default function playlistReducer (state = initialStore, {type, payload}) {
    switch(type) {
        case FULFILLED(GET_PLAYLIST): {
            return {
                ...state,
                tracks: payload.data.tracks,
                pending: false
            }
        }
        default:
            return handleRequestStates(type, state, [GET_PLAYLIST])
    }
}
