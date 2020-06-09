import axios from "axios"
export const GET_PLAYLIST = "GET_PLAYLIST"
export const SAVE_TRACK = "SAVE_TRACK"

export const getPlaylist = (token, moods, genres) => {
    const promise = axios.get("https://api.spotify.com/v1/recommendations", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            seed_genres: genres.map((item) => item.toLowerCase()).join(),
            ...moods,
        },
        limit: 20,
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
