import axios from 'axios'

export const TRANSFER_PLAYBACK = 'TRANSFER_PLAYBACK'
export const SEEK_FOR_POSITION = 'SEEK_FOR_POSITION'

export const transferPlaybackHere = (deviceId, token) => {
    const data = JSON.stringify({
        'device_ids': [deviceId],
        'play': false
    })
    const promise = axios.put('https://api.spotify.com/v1/me/player', data, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    )

    return {
        type: TRANSFER_PLAYBACK,
        payload: promise
    }
}

export const seekForPosition = (position, deviceId, token) => {
    const data = JSON.stringify({
        "device_id":  deviceId,
        "position_ms": position,
        "play": true
    })
    const promise = axios.put('https://api.spotify.com/v1/me/player/seek', data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        params: {
            'position_ms': position,
            'device_id': deviceId
        },
    })

    return {
        type: SEEK_FOR_POSITION,
        payload: promise
    }
}
