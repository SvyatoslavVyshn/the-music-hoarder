import { GET_PLAYLIST, SAVE_TRACK, DELETE_TRACK, CHANGE_ADDED } from "./actions"
import { CLEAR_FLAGS } from "../common/actions"
import { FULFILLED } from "../../constants"

import { handleRequestStates } from "../../utils"

const initialStore = {
    flags: {},
}

export default function playlistReducer(
    state = initialStore,
    { type, payload }
) {
    switch (type) {
        case FULFILLED(GET_PLAYLIST): {
            return {
                ...state,
                tracks: payload.data.tracks.map((track) => {
                    return { ...track, added: false }
                }),
                pending: false,
            }
        }

        case FULFILLED(SAVE_TRACK): {
            return {
                ...state,
                flags: {
                    ...state.flags,
                    addTrackSuccess: true,
                },
            }
        }

        case FULFILLED(DELETE_TRACK): {
            return {
                ...state,
                flags: {
                    ...state.flags,
                    deleteTrackSuccess: true,
                },
            }
        }

        case CHANGE_ADDED: {
            const newTracks = state.tracks.slice()
            const trackIndex = newTracks.findIndex(
                (track) => track.id === payload
            )
            newTracks[trackIndex].added = !newTracks[trackIndex].added

            return {
                ...state,
                tracks: newTracks,
            }
        }

        case CLEAR_FLAGS: {
            return {
                ...state,
                ...initialStore,
            }
        }

        default:
            return handleRequestStates(type, state, [GET_PLAYLIST])
    }
}
