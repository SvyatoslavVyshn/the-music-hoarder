export const REMOVE_ALERT = 'REMOVE_ALERT'
export const ADD_ALERT = 'ADD_ALERT'

export function removeAlert (id) {
    return {
        type: REMOVE_ALERT,
        payload: { id }
    }
}

export function addAlert (message) {
    return {
        type: ADD_ALERT,
        payload: { message }
    }
}