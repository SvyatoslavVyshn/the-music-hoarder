import { FULFILLED } from "../../constants"
import {
    AUTHENTICATE,
    LOGOUT,
    GET_NEW_ACCESS_TOKEN,
    GET_CURRENT_USER,
} from "./actions"

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

        case FULFILLED(GET_NEW_ACCESS_TOKEN): {
            const existingData = JSON.parse(localStorage.getItem("params"))
            existingData.access_token = action.payload.data.access_token
            existingData.expires_in = new Date(
                new Date().getTime() + parseInt(3600000)
            )

            localStorage.setItem("params", JSON.stringify(existingData))

            return {
                ...state,
                access_token: action.payload.data.access_token,
            }
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
