import { HANDLE_STATE_CHANGE, SET_PLAYER_STATE, CREATE_PLAYER } from './actions'

const initialState = {
    deviceId: null,
    error: '',
    trackName: 'Track Name',
    artistName: 'Artist Name',
    albumName: 'Album Name',
    playing: false,
    position: 0,
    duration: 0,
    playerPos: 0,
    positionVal: 0,
    img: null,
    changeTrack: 'button',
    player: null
}

export const playerReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CREATE_PLAYER: {
            return {
                ...state,
                player: payload
            }
        }
        case HANDLE_STATE_CHANGE: {
            return {
                ...state,
                ...payload
            }
        }
        case SET_PLAYER_STATE: {
            return {
                ...state,
                ...payload
            }
        }
        default:
            return state
    }
}

export default playerReducer
