import React, { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import Slider from "@material-ui/core/Slider"
import IconButton from "@material-ui/core/IconButton"
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious"
import SkipNextIcon from "@material-ui/icons/SkipNext"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import PauseIcon from "@material-ui/icons/Pause"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

import { truncate, millisToMinutesAndSeconds } from "../../utils"
import {
    seekForPosition,
    onStateChange,
    createPlayer,
} from "../../store/player/actions"

import "./player.scss"

const Player = (props) => {
    const playerState = useSelector((state) => state.player)
    const dispatch = useDispatch()
    const { token } = props

    const { player, playing } = playerState

    const [temporaryValue, setTemporaryValue] = useState(0)
    const [isSliderFocused, setIsSliderFocused] = useState(false)

    const handleChange = useCallback(
        (playbackChange, inputChange) => {
            if (!isSliderFocused && playbackChange) {
                setTemporaryValue(playbackChange.value)
            } else if (inputChange) {
                setTemporaryValue(inputChange.value)
            }
        },
        [isSliderFocused]
    )

    useEffect(() => {
        dispatch(createPlayer(token))
    }, [token, dispatch])

    useEffect(() => {
        let playerTimer
        if (playing) {
            playerTimer = setInterval(
                () =>
                    player.getCurrentState().then((state) => {
                        handleChange({ value: state.position }, null)
                        dispatch(onStateChange(state))
                    }),
                1000
            )
        }
        return () => {
            clearInterval(playerTimer)
        }
    }, [playing, player, handleChange, dispatch])

    const handlePositionChange = (value) => {
        // dispatch(setPlayerState({position: value}))

        dispatch(seekForPosition(value, playerState.deviceId, token))
    }

    return (
        <>
            {playerState && playerState.deviceId && playerState.img && (
                <div className="player">
                    <Grid container spacing={1}>
                        <Grid item md={3}>
                            <div className="player-info">
                                <img
                                    className="info-image"
                                    src={playerState.img}
                                    alt={playerState.albumName}
                                />

                                <div className="info-text">
                                    <Typography
                                        variant="subtitle1"
                                        color="textPrimary"
                                    >
                                        {truncate(playerState.trackName, 45)}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        {truncate(playerState.artistName, 45)}
                                    </Typography>
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <div className="player-controls">
                                <div className="player-slider">
                                    <p className="player-time">
                                        {millisToMinutesAndSeconds(
                                            playerState.position
                                        )}
                                    </p>

                                    <Slider
                                        min={0}
                                        max={playerState.duration}
                                        step={0.01}
                                        value={
                                            temporaryValue === 0 &&
                                            !isSliderFocused &&
                                            playerState.position !== 0
                                                ? playerState.position
                                                : temporaryValue
                                        }
                                        onFocus={() => setIsSliderFocused(true)}
                                        onBlur={() => setIsSliderFocused(false)}
                                        onChange={(e, value) =>
                                            handleChange(null, { value })
                                        }
                                        onChangeCommitted={(e, value) => {
                                            document.activeElement.blur()
                                            setIsSliderFocused(false)
                                            handleChange(null, { value })
                                            handlePositionChange(value)
                                        }}
                                    />

                                    <p className="player-time">
                                        {millisToMinutesAndSeconds(
                                            playerState.duration
                                        )}
                                    </p>
                                </div>
                                <div className="player-buttons">
                                    <IconButton
                                        onClick={() => player.previousTrack()}
                                    >
                                        <SkipPreviousIcon />
                                    </IconButton>

                                    <IconButton
                                        onClick={() => player.togglePlay()}
                                    >
                                        {playerState.playing ? (
                                            <PauseIcon />
                                        ) : (
                                            <PlayArrowIcon />
                                        )}
                                    </IconButton>

                                    <IconButton
                                        onClick={() => player.nextTrack()}
                                    >
                                        <SkipNextIcon />
                                    </IconButton>
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={3}>
                            <div className="player-placeholder"></div>
                        </Grid>
                    </Grid>
                </div>
            )}
        </>
    )
}

export default Player