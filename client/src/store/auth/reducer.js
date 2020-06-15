import { FULFILLED } from "../../constants"
import { AUTHENTICATE, LOGOUT, GET_CURRENT_USER } from "./actions"

const initialState = {
    access_token: null,
    user: {},
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATE: {
            return {
                ...state,
                access_token: action.access_token,
            }
        }
        case LOGOUT: {
            return initialState
        }

        case FULFILLED(GET_CURRENT_USER): {
            return {
                ...state,
                user: action.payload.data,
            }
        }

        default:
            return state
    }
}
