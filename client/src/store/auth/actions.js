import axios from "axios"
import { getHashParams } from "../../utils"

export const AUTHENTICATE = "AUTHENTICATE"
export const LOGOUT = "LOGOUT"
export const GET_CURRENT_USER = "GET_CURRENT_USER"

let timer

export const authenticate = (access_token, expiryTime) => {
    return (dispatch) => {
        dispatch(setLogoutTimer(expiryTime))
        dispatch({
            type: AUTHENTICATE,
            access_token,
        })
    }
}

export const login = () => {
    return (dispatch) => {
        let params

        if (getHashParams().access_token && getHashParams().expires_in) {
            params = getHashParams()
            const expirationDate = new Date(
                new Date().getTime() + parseInt(params.expires_in)
            )
            saveDataToStorage(params.access_token, expirationDate)
            dispatch(
                authenticate(params.access_token, parseInt(params.expires_in))
            )
        } else {
            params = JSON.parse(localStorage.getItem("params"))
            if (params && params.access_token) {
                const expirationTime =
                    new Date(params.expires_in).getTime() - new Date().getTime()
                dispatch(authenticate(params.access_token, expirationTime))
            }
        }
    }
}

export const logout = () => {
    clearLogoutTimer()
    localStorage.removeItem("params")
    const promise = axios.get("/api/logout")
    // const url = "https://www.spotify.com/logout/"
    // const spotifyLogoutWindow = global.window.open(
    //     url,
    //     "Spotify Logout",
    //     "width=700,height=500,top=40,left=40"
    // )
    // setTimeout(() => spotifyLogoutWindow.close(), 1000)
    return {
        type: LOGOUT,
        payload: promise,
    }
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
}

const setLogoutTimer = (expirationTime) => {
    return (dispatch) => {
        timer = setTimeout(() => {
            dispatch(getNewToken())
        }, expirationTime)
    }
}

const saveDataToStorage = (access_token, expirationDate) => {
    localStorage.setItem(
        "params",
        JSON.stringify({
            access_token,
            expires_in: expirationDate.toLocaleString(),
        })
    )
}

export const getNewToken = () => {
    return async (dispatch) => {
        const res = await axios.get("/auth/refresh-token")
        const expirationDate = new Date(new Date().getTime() + 3600000)

        clearLogoutTimer()
        saveDataToStorage(res.data.access_token, expirationDate)
        dispatch(authenticate(res.data.access_token, 3600000))
    }
}

export const getUser = () => {
    const promise = axios.get("/api/current_user")

    return {
        type: GET_CURRENT_USER,
        payload: promise,
    }
}
