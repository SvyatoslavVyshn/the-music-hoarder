import axios from "axios"
import { addAlert } from "../alerts/actions"

export const SET_PLAYER_STATE = "SET_PLAYER_STATE"
export const HANDLE_STATE_CHANGE = "HANDLE_STATE_CHANGE"
export const TRANSFER_PLAYBACK = "TRANSFER_PLAYBACK"
export const SEEK_FOR_POSITION = "SEEK_FOR_POSITION"
export const CREATE_PLAYER = "CREATE_PLAYER"
export const PLAY_TRACK = "PLAY_TRACK"
export const ADD_TO_QUEUE = "ADD_TO_QUEUE"

export const createPlayer = () => {
    return (dispatch, getState) => {
        let actualToken = getState().auth.access_token

        // setInterval(() => {
        //     if (getState().auth.access_token !== actualToken) {
        //         console.log("not equal")
        //         actualToken = getState().auth.access_token
        //     }
        // }, 1000)

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: "The Music Hoarder Player",
                getOAuthToken: (cb) => {
                    const expirationDate = JSON.parse(
                        localStorage.getItem("params")
                    ).expires_in
                    const expirationTime = new Date(expirationDate).getTime()

                    const launchTokenCheck = (timeout) => {
                        setTimeout(() => {
                            checkToken()
                        }, timeout)
                    }

                    const checkToken = () => {
                        if (getState().auth.access_token !== actualToken) {
                            actualToken = getState().auth.access_token
                            cb(actualToken)
                            const newExpirationDate = JSON.parse(
                                localStorage.getItem("params")
                            ).expires_in
                            const newExpirationTime = new Date(
                                newExpirationDate
                            ).getTime()
                            launchTokenCheck(newExpirationTime)
                        } else {
                            cb(actualToken)
                            launchTokenCheck(expirationTime)
                        }
                    }

                    cb(actualToken)
                    launchTokenCheck(expirationTime)

                    // cb(actualToken)

                    // setInterval(() => {
                    //     if (getState().auth.access_token !== actualToken) {
                    //         console.log("not equal")
                    //         actualToken = getState().auth.access_token
                    //         cb(actualToken)
                    //     }
                    // }, 1000)
                },
            })

            // Error handling
            player.addListener("initialization_error", ({ message }) => {
                // clearInterval(interval)
                dispatch(
                    addAlert({
                        title: "Initialization Error",
                        text: message,
                        error: true,
                    })
                )
            })
            player.addListener("authentication_error", ({ message }) => {
                // clearInterval(interval)
                dispatch(
                    addAlert({
                        title: "Authentication Error",
                        text: message,
                        error: true,
                    })
                )
            })
            player.addListener("account_error", ({ message }) => {
                // clearInterval(interval)
                dispatch(
                    addAlert({
                        title: "Account Error",
                        text: message,
                        error: true,
                    })
                )
            })
            player.addListener("playback_error", ({ message }) => {
                // clearInterval(interval)
                dispatch(
                    addAlert({
                        title: "Playback Error",
                        text: message,
                        error: true,
                    })
                )
            })
            player.addListener("player_state_changed", (state) => {
                // clearInterval(interval)
                dispatch(onStateChange(state))
            })

            player.addListener("ready", ({ device_id }) => {
                dispatch(transferPlaybackHere(device_id, actualToken))

                dispatch(setPlayerState({ deviceId: device_id }))
            })

            // Not Ready
            player.addListener("not_ready", ({ device_id }) => {})

            player.addListener("disconnect", () => {
                // clearInterval(interval)
            })

            // Connect to the player!
            player.connect()

            dispatch({
                type: CREATE_PLAYER,
                payload: player,
            })
        }
    }
}

export const setPlayerState = (obj) => {
    return {
        type: SET_PLAYER_STATE,
        payload: obj,
    }
}

export const onStateChange = (state) => {
    if (state) {
        const { current_track: currentTrack } = state.track_window
        const { duration, position } = state
        const trackName = currentTrack.name
        const albumName = currentTrack.album.name
        const artistName = currentTrack.artists
            .map((artist) => artist.name)
            .join(", ")
        const playing = !state.paused
        const img = currentTrack.album.images[0].url
        return {
            type: HANDLE_STATE_CHANGE,
            payload: {
                position,
                duration,
                trackName,
                albumName,
                artistName,
                playing,
                img,
            },
        }
    }
}

export const transferPlaybackHere = (deviceId, token) => {
    const data = JSON.stringify({
        device_ids: [deviceId],
        play: false,
    })
    const promise = axios.put("https://api.spotify.com/v1/me/player", data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })

    return {
        type: TRANSFER_PLAYBACK,
        payload: promise,
    }
}

export const seekForPosition = (position, deviceId, token) => {
    const data = JSON.stringify({
        device_id: deviceId,
        position_ms: position,
        play: true,
    })
    const promise = axios.put(
        "https://api.spotify.com/v1/me/player/seek",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            params: {
                position_ms: parseInt(position),
                device_id: deviceId,
            },
        }
    )

    return {
        type: SEEK_FOR_POSITION,
        payload: promise,
    }
}

export const playTrack = (token, uris, offset, deviceId) => {
    const data = JSON.stringify({
        device_ids: [deviceId],
        offset,
        uris: uris,
        play: true,
    })
    const promise = axios.put(
        "https://api.spotify.com/v1/me/player/play",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    )

    return {
        type: PLAY_TRACK,
        payload: promise,
    }
}

export const addToQueue = (token, uris) => {
    const promise = axios.post("https://api.spotify.com/v1/me/player/queue", {
        params: {
            uri: uris,
        },
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })

    return {
        type: ADD_TO_QUEUE,
        payload: promise,
    }
}
