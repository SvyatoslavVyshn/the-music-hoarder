import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles"

import { history, store } from "./store"
import theme from "./theme"

import StartUp from "./components/StartUp"
import Alerts from "./common/Alerts"
import * as serviceWorker from "./serviceWorker"

import "./index.scss"

const app = (
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <>
                <Alerts />
                <ConnectedRouter history={history}>
                    <StartUp />
                </ConnectedRouter>
            </>
        </MuiThemeProvider>
    </Provider>
)

ReactDOM.render(app, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
