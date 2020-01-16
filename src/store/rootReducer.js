import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import auth from './auth/reducer'
import inputs from './inputs/reducer'
import alerts from './alerts/reducer'

export default (history) => combineReducers({
    router: connectRouter(history),
    auth,
    inputs,
    alerts
})