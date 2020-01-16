import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import rootReducer from './rootReducer'

export const history = createBrowserHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose, middleware = [thunk, routerMiddleware(history)];


export const store = createStore(
    rootReducer(history),
    composeEnhancers(applyMiddleware(...middleware))
)