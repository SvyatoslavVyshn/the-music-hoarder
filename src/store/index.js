import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import promiseMiddleware from 'redux-promise-middleware'

import rootReducer from './rootReducer'

export const history = createBrowserHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose, middleware = [thunk, promiseMiddleware, routerMiddleware(history)];


export const store = createStore(
    rootReducer(history),
    composeEnhancers(applyMiddleware(...middleware))
)