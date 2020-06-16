import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import List from "@material-ui/core/List"
// import Paper from "@material-ui/core/Paper"
import MusicNoteIcon from "@material-ui/icons/MusicNote"
import CircularProgress from "@material-ui/core/CircularProgress"
import PlaylistItem from "../PlaylistItem"

import { playTrack } from "../../../store/player/actions"
import { saveTrack } from "../../../store/playlist/actions"
import { addAlert } from "../../../store/alerts/actions"
import { clearFlags } from "../../../store/common/actions"

import "./playlist.scss"

const Playlist = (props) => {
    // const [playingUrl, setPlayingUrl] = useState("")
    // const [stateAudio, setStateAudio] = useState(null)
    // const [playing, setPlaying] = useState(false)

    const playlist = useSelector((state) => state.playlist)
    const deviceId = useSelector((state) => state.player.deviceId)
    const { product } = useSelector((state) => state.auth.user)

    const dispatch = useDispatch()

    useEffect(() => {
        if (playlist.flags.addTrackSuccess) {
            dispatch(
                addAlert({
                    title: "Success",
                    text: "Successfuly saved track to your library",
                    timeout: true,
                })
            )
            dispatch(clearFlags())
        }
    }, [dispatch, playlist.flags.addTrackSuccess])

    const selectTrack = (uri) => {
        const uris = playlist.tracks.map((track) => track.uri)
        const uriOffset = { uri }
        dispatch(playTrack(props.token, uris, uriOffset, deviceId))
    }

    const trackSave = (id) => {
        dispatch(saveTrack(props.token, id))
    }

    // const playAudio = (previewUrl) => {
    //     if (previewUrl) {
    //         let audio = new Audio(previewUrl)
    //         if (!playing) {
    //             audio.play()
    //             setPlaying(true)
    //             setPlayingUrl(previewUrl)
    //             setStateAudio(audio)
    //         } else {
    //             if (playingUrl === previewUrl) {
    //                 stateAudio.pause()
    //                 setPlaying(false)
    //             } else {
    //                 stateAudio.pause()
    //                 stateAudio.play()
    //                 setPlayingUrl(previewUrl)
    //                 setPlaying(true)
    //                 setStateAudio(audio)
    //             }
    //         }
    //     } else {
    //         console.log("Sorry, demo for this song is not available")
    //     }
    // }

    return (
        <div className="playlist-container">
            {playlist.tracks &&
                playlist.tracks.length > 0 &&
                !playlist.pending && (
                    <List>
                        {playlist.tracks &&
                            playlist.tracks.map((track) => (
                                <PlaylistItem
                                    // playAudio={playAudio}
                                    product={product}
                                    // playing={playing}
                                    // playingUrl={playingUrl}
                                    trackSave={trackSave}
                                    selectTrack={selectTrack}
                                    token={props.token}
                                    key={track.id}
                                    track={track}
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
