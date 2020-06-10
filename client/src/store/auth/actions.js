import { getHashParams } from '../../utils'

export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

let timer

export const authenticate = (access_token, expiryTime) => {
    return dispatch => {
        console.log(expiryTime, 'expTime')
        dispatch(setLogoutTimer(expiryTime))
        dispatch({
            type: AUTHENTICATE,
            access_token
        })
    }
}

export const login = () => {
    return dispatch => {
        let params

        if(getHashParams().access_token && getHashParams().expires_in) {
            params = getHashParams()
            const expirationDate = new Date(new Date().getTime() + parseInt(params.expires_in) * 1000)
            console.log(expirationDate)
            saveDataToStorage(params.access_token, expirationDate)
            dispatch(authenticate(params.access_token, parseInt(params.expires_in) * 1000))
        } else {
            params = JSON.parse(localStorage.getItem('params'))
            if(params && params.access_token) {
                const expirationTime = new Date (params.expires_in).getTime() - new Date ().getTime()
                dispatch(authenticate(params.access_token, expirationTime))
            }
        }
    }
}

export const logout = () => {
        clearLogoutTimer()
        localStorage.removeItem('params')
        const url = 'https://www.spotify.com/logout/'                                                                                                                                                                                                                                                                               
        const spotifyLogoutWindow = global.window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40')                                                                                                
        // setTimeout(() => spotifyLogoutWindow.close(), 1000)
        return{
            type: LOGOUT
        }
}

const clearLogoutTimer = () => {
    if(timer) {
        clearTimeout(timer)
    }
}

const setLogoutTimer = expirationTime => {
    console.log(expirationTime, 'logoutTime')
    return dispatch => {
        timer = setTimeout(() => {
            console.log(expirationTime,"timeout")
            dispatch(logout())
        }, expirationTime)
    }
}

const saveDataToStorage = (access_token, expirationDate) => {
    console.log(expirationDate)
    localStorage.setItem('params', JSON.stringify({ access_token, expires_in: expirationDate.toLocaleString() }))
}
