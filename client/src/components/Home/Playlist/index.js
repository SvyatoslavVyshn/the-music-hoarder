import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import List from "@material-ui/core/List"
import MusicNoteIcon from "@material-ui/icons/MusicNote"
import CircularProgress from "@material-ui/core/CircularProgress"
import PlaylistItem from "../PlaylistItem"

import { playTrack } from "../../../store/player/actions"
import {
    saveTrack,
    removeFromLibrary,
    changeAdded,
} from "../../../store/playlist/actions"
import { addAlert } from "../../../store/alerts/actions"
import { clearFlags } from "../../../store/common/actions"

import "./playlist.scss"

const Playlist = (props) => {
    const playlist = useSelector((state) => state.playlist)
    const deviceId = useSelector((state) => state.player.deviceId)
    const { product } = useSelector((state) => state.auth.user)

    const dispatch = useDispatch()

    useEffect(() => {
        if (playlist.flags.deleteTrackSuccess) {
            dispatch(
                addAlert({
                    title: "Success delete",
                    text: "Successfuly deleted track from your library",
                    timeout: true,
                })
            )
            dispatch(clearFlags())
        } else if (playlist.flags.addTrackSuccess) {
            dispatch(
                addAlert({
                    title: "Success",
                    text: "Successfuly saved track to your library",
                    timeout: true,
                })
            )
            dispatch(clearFlags())
        }
    }, [
        dispatch,
        playlist.flags.addTrackSuccess,
        playlist.flags.deleteTrackSuccess,
    ])

    const handleAdded = (id) => {
        dispatch(changeAdded(id))
    }

    const selectTrack = (uri) => {
        const uris = playlist.tracks.map((track) => track.uri)
        const uriOffset = { uri }
        dispatch(playTrack(props.token, uris, uriOffset, deviceId))
    }

    const trackSave = (id) => {
        dispatch(saveTrack(props.token, id))
    }

    const trackDelete = (id) => {
        dispatch(removeFromLibrary(props.token, id))
    }

    return (
        <div className="playlist-container">
            {playlist.tracks &&
                playlist.tracks.length > 0 &&
                !playlist.pending && (
                    <List>
                        {playlist.tracks &&
                            playlist.tracks.map((track) => (
                                <PlaylistItem
                                    product={product}
                                    trackSave={trackSave}
                                    selectTrack={selectTrack}
                                    token={props.token}
                                    key={track.id}
                                    track={track}
                                    trackDelete={trackDelete}
                                    handleAdded={handleAdded}
                                />
                            ))}
                    </List>
                )}
            {!playlist.tracks && !playlist.pending && (
                <div className="playlist-placeholder">
                    <div className="playlist-caption">
                        <div className="icon-container">
                            <MusicNoteIcon fontSize="large" />
                        </div>
                        <p>You will see searched tracks here.</p>
                    </div>
                </div>
            )}

            {playlist.pending && (
                <div className="loader-container">
                    <CircularProgress size={80} color="primary" />
                </div>
            )}
        </div>
    )
}

export default Playlist
