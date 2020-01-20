import axios from 'axios'
export const GET_PLAYLIST = 'GET_PLAYLIST'

export const getPlaylist = (token, moods, genres) => {
    const promise = axios.get('https://api.spotify.com/v1/recommendations',
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                'seed_genres': genres.join(),
                ...moods
            },
            limit: 20
        }
    )

    return {
        type: GET_PLAYLIST,
        payload: promise
    }
}
