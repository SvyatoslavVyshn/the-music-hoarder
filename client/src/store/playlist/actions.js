import axios from "axios"
export const GET_PLAYLIST = "GET_PLAYLIST"
export const SAVE_TRACK = "SAVE_TRACK"
export const DELETE_TRACK = "DELETE_TRACK"
export const CHANGE_ADDED = "CHANGE_ADDED"

export const changeAdded = (id) => {
    return {
        type: CHANGE_ADDED,
        payload: id,
    }
}

export const getPlaylist = (token, moods, genres, market) => {
    let params
    const paramMoods = Object.keys(moods)

    if (paramMoods.every((key) => moods[key] == 0)) {
        params = {
            market,
            limit: 50,
            seed_genres: genres.map((item) => item.toLowerCase()).join(),
        }
    } else {
        let newMoods = { ...moods }

        for (let key in newMoods) {
            if (newMoods[key] === 0) {
                delete newMoods[key]
            }
        }

        params = {
            market,
            limit: 50,
            seed_genres: genres.map((item) => item.toLowerCase()).join(),
            ...newMoods,
        }
    }

    const promise = axios.get("https://api.spotify.com/v1/recommendations", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params,
    })

    return {
        type: GET_PLAYLIST,
        payload: promise,
    }
}

export const saveTrack = (token, id) => {
    const promise = axios.put(
        "https://api.spotify.com/v1/me/tracks",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            params: {
                ids: [id].join(),
            },
        }
    )

    return {
        type: SAVE_TRACK,
        payload: promise,
    }
}

export const removeFromLibrary = (token, id) => {
    const promise = axios.delete("https://api.spotify.com/v1/me/tracks", {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        params: {
            ids: [id].join(),
        },
    })

    return {
        type: DELETE_TRACK,
        payload: promise,
    }
}
