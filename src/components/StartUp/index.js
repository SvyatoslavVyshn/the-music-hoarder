import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import {login, authenticate } from '../../store/auth/actions'
// import { parseISOString } from '../../utils'

import Login from '../Login'
import Home from '../Home'

const StartUp = props => {
    const { history } = props
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(login())
        const tryLogin = () => {
            const params = localStorage.getItem('params')
            if(!params) {
                history.push("/login")
                return
            }
            const transformedParams = JSON.parse(params)
            const { access_token, expires_in } = transformedParams
            const expirationDate = new Date(expires_in)
    
            if(expirationDate <= new Date() || !access_token || !expirationDate) {
                history.push("/login")
                return
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime()
    
            dispatch(authenticate(access_token, expirationTime))
            history.push("/home")
        }
        tryLogin()
    }, [dispatch, history])

    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home}/>
            <Route path="*" render={() => <Redirect to="/"/> } />
        </Switch>
    )
}

export default withRouter(StartUp)