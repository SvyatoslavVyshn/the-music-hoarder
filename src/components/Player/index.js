import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Slider from '@material-ui/core/Slider'
import IconButton from '@material-ui/core/IconButton'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { truncate,  millisToMinutesAndSeconds, debounce } from '../../utils'
import { transferPlaybackHere, seekForPosition } from '../../store/player/actions'

import './player.scss'

const Player = props => {
    const [playerState, setPlayerState] = useState({
        deviceId: null,
        error: '',
        trackName: 'Track Name',
        artistName: 'Artist Name',
        albumName: 'Album Name',
        playing: false,
        position: 0,
        duration: 0,
        playerPos: 0,
        positionVal: 0,
        img: null,
        changeTrack: 'button'
    })
    const [player, setPlayer] = useState(null)
    const dispatch = useDispatch()
    
    const { playing } = playerState
    const { token } = props

    useEffect(() => {
        const authorizePlayer = async () => {
            window.onSpotifyWebPlaybackSDKReady = () => {
                const player = new window.Spotify.Player({
                            name: 'The Music Hoarder Player',
                            getOAuthToken: cb => { cb(token); }
                        })
                
                
                // Error handling
                player.addListener('initialization_error', ({ message }) => { console.error(message); });
                player.addListener('authentication_error', ({ message }) => { console.error(message); });
                player.addListener('account_error', ({ message }) => { console.error(message); });
                player.addListener('playback_error', ({ message }) => { console.error(message); });
                player.addListener('player_state_changed', state => { onStateChanged(state); });
    
                player.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id);
                    setPlayerState(prevState => ({
                        ...prevState,
                        deviceId: device_id
                    }))
                    dispatch(transferPlaybackHere(device_id, token))
                });
            
                // Not Ready
                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });
            
                // Connect to the player!
                player.connect();

                setPlayer(player)
    
            }
        }
        authorizePlayer()
    },[token, dispatch])

    useEffect(() => {
        let playerTimer
        if(playing) {
            playerTimer = setInterval(
                () =>
                    player.getCurrentState().then(state => {
                        onStateChanged(state)
                    }),
                1000
            )
        }
        return () => {
            clearInterval(playerTimer)
        }
    }, [playing, player])

    const onStateChanged = state => {
        if (state !== null) {
            const { current_track: currentTrack } = state.track_window
            const { duration, position } = state
            const trackName = currentTrack.name
            const albumName = currentTrack.album.name
            const artistName = currentTrack.artists.map(artist => artist.name).join(', ')
            const playing = !state.paused
            const img = currentTrack.album.images[0].url
            setPlayerState(prevState => ({
                ...prevState,
                position,
                duration,
                trackName,
                albumName,
                artistName,
                playing,
                img
            }))
            // this.props.setPlayerState(this.state)
        }
    }

    const handlePositionChange = (value) => {
        setPlayerState(prevState => ({
            ...prevState,
            position: value
        }))
        debounce(
            dispatch(
                seekForPosition(value, playerState.deviceId, token)
            ),
        600)
    }

    return (
        <>
            {
                playerState.deviceId &&
                <div className="player">
                    <Grid container spacing={1}>
                        <Grid item md={3}>
                            <div className="player-info">
                    
                                <img className="info-image" src={playerState.img} alt={playerState.albumName}/>
                        
                                <div className="info-text">
                                    <Typography variant="subtitle1" color="textPrimary">{truncate(playerState.trackName, 45)}</Typography>
                                    <Typography variant="subtitle2" color="textSecondary">{truncate(playerState.artistName, 45)}</Typography>
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <div className="player-controls">
                                <div className="player-slider">
                                    <p className="player-time">{millisToMinutesAndSeconds(playerState.position)}</p>
                                    <Slider 
                                        min={0}
                                        max={playerState.duration}
                                        step={0.01}
                                        value={playerState.position}
                                        onChange={(e, value) => handlePositionChange(value)}
                                    />
                                    <p className="player-time">{millisToMinutesAndSeconds(playerState.duration)}</p>
                                </div>
                                <div className="player-buttons">
                                    <IconButton onClick={() => player.previousTrack()}>
                                        <SkipPreviousIcon />
                                    </IconButton>
        
                                    <IconButton onClick={() => player.togglePlay()}>
                                        {playerState.playing ? <PauseIcon /> : <PlayArrowIcon />}
                                    </IconButton>
        
                                    <IconButton onClick={() => player.nextTrack()}>
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
            }
        </>
    )
}

export default Player
