import { AUTHENTICATE, LOGOUT } from './actions'

const initialState = {
    access_token: null
}

export default function authReducer (state = initialState, action) {
    switch(action.type) {
        case AUTHENTICATE: {
            return {
                access_token: action.access_token
            }
        }
        case LOGOUT: {
            return initialState
        }
        default:
            return state
    }
}