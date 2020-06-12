import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Switch, Redirect, withRouter } from "react-router-dom"

import Drawer from "@material-ui/core/Drawer"

import Moods from "../Home/Moods"

import { login, authenticate, logout } from "../../store/auth/actions"
// import { parseISOString } from '../../utils'

import Login from "../Login"
import Home from "../Home"
import Navbar from "../Navbar"

const StartUp = (props) => {
    const [isDrawerOpen, setIsdraweOpen] = useState(false)
    const { history } = props
    const params = localStorage.getItem("params")
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout)
        history.push("/login")
    }

    useEffect(() => {
        dispatch(login())
        const tryLogin = () => {
            const params = localStorage.getItem("params")
            if (!params) {
                history.push("/login")
                return
            }
            const transformedParams = JSON.parse(params)
            const { access_token, expires_in } = transformedParams
            const expirationDate = new Date(expires_in)

            if (
                expirationDate <= new Date() ||
                !access_token ||
                !expirationDate
            ) {
                history.push("/login")
                return
            }

            const expirationTime =
                expirationDate.getTime() - new Date().getTime()

            dispatch(authenticate(access_token, expirationTime))
            history.push("/home")
        }
        tryLogin()
    }, [dispatch, history])

    return (
        <div>
            <Navbar
                isAuth={!!params}
                logout={handleLogout}
                openDrawer={() => setIsdraweOpen((prevState) => !prevState)}
            />
            {/* <Drawer
                PaperProps={{
                    style: {
                        width: "20%",
                        padding: "20px",
                    },
                }}
                open={isDrawerOpen}
                onClose={() => setIsdraweOpen((prevState) => !prevState)}
                anchor="left"
            >
                <Moods />
            </Drawer> */}
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="*" render={() => <Redirect to="/" />} />
            </Switch>
        </div>
    )
}

export default withRouter(StartUp)
