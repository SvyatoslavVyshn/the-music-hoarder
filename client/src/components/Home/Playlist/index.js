import React from "react"
import { useSelector, useDispatch } from "react-redux"
import List from "@material-ui/core/List"
import Paper from "@material-ui/core/Paper"
import MusicNoteIcon from "@material-ui/icons/MusicNote"
import CircularProgress from "@material-ui/core/CircularProgress"
import PlaylistItem from "../PlaylistItem"

import { playTrack } from "../../../store/player/actions"
import { saveTrack } from "../../../store/playlist/actions"

import "./playlist.scss"

const Playlist = (props) => {
    const playlist = useSelector((state) => state.playlist)
    const deviceId = useSelector((state) => state.player.deviceId)
    const dispatch = useDispatch()

    const selectTrack = (uri) => {
        const uris = playlist.tracks.map((track) => track.uri)
        const fromIndex = uris.findIndex((item) => item === uri)
        const playableUris = uris.slice(fromIndex, uris.length + 1)
        dispatch(playTrack(props.token, playableUris, deviceId))
    }

    const trackSave = (id) => {
        dispatch(saveTrack(props.token, id))
    }

    return (
        <div>
            {playlist.tracks.length > 0 && !playlist.pending && (
                <Paper square elevation={3}>
                    <List>
                        {playlist.tracks &&
                            playlist.tracks.map((track) => (
                                <PlaylistItem
                                    trackSave={trackSave}
                                    selectTrack={selectTrack}
                                    token={props.token}
                                    key={track.id}
                                    track={track}
                                />
                            ))}
                    </List>
                </Paper>
            )}
            {playlist.tracks.length === 0 && !playlist.pending && (
                <div className="playlist-placeholder">
                    <div className="playlist-caption">
                        <div className="icon-container">
                            <MusicNoteIcon fontSize="large" />
                        </div>
                        <p>Here is no music yet.</p>
                        <p>
                            Use search functionality above to see tracks here!
                        </p>
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
