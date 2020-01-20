export function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

export function truncate (str, maxlength) {
    return (str.length > maxlength) ? str.slice(0, maxlength - 3) + '...' : str;
}

export function handleRequestStates (type, state, actionTypes= ['ACTION_TYPE']) {
    const matchPart = actionTypes.join('|')

    const matchComplete = new RegExp(`^(${matchPart})(_REJECTED|_FULFILLED)$`)
    const matchPending = new RegExp(`^(${matchPart})_PENDING`)

    if(type.match(matchComplete)){
        return { ...state, pending: false }
    }
    if(type.match(matchPending)){
        return {...state, pending: true}
    }

    return state
}

