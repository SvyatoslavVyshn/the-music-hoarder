import React from 'react'
import { useSelector } from 'react-redux'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import CircularProgress from '@material-ui/core/CircularProgress'

import PlaylistItem from '../PlaylistItem'

import './playlist.scss'

const Playlist = props => {
    const playlist = useSelector(state => state.playlist)
    
    if(playlist.tracks.length > 0 && !playlist.pending){
        return (
            <Paper square elevation={3}>
                <List>
                    { playlist.tracks.map(track => <PlaylistItem key={track.id} track={track} /> ) }
                </List>
            </Paper>
        )
    } else if ( playlist.tracks.length === 0 && !playlist.pending ) {
        return (
            <div className="playlist-placeholder">    
                <div className="playlist-caption">
                    <div className="icon-container"><MusicNoteIcon fontSize="large" /></div>
                    <p>Here is no music yet.</p>
                    <p>Use search functionality above to see tracks here!</p>
                </div>
            </div>
        )
    } else {
        return (
            <CircularProgress size={80} color="secondary"/>
        )
    }
}

export default Playlist
