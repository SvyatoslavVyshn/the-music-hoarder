import { GET_PLAYLIST, SAVE_TRACK } from "./actions"
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
                tracks: payload.data.tracks,
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
