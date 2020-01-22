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
    return (
        <div>
            {playlist.tracks.length > 0 && !playlist.pending &&
                <Paper square elevation={3}>
                    <List>
                        { playlist.tracks.map(track => <PlaylistItem key={track.id} track={track} /> ) }
                    </List>
                </Paper>
            }
            {playlist.tracks.length === 0 && !playlist.pending &&
               <div className="playlist-placeholder">    
                    <div className="playlist-caption">
                        <div className="icon-container">
                            <MusicNoteIcon fontSize="large" />
                        </div>
                        <p>Here is no music yet.</p>
                        <p>Use search functionality above to see tracks here!</p>
                    </div>
                </div> 
            }
            {
                playlist.pending && 
                    <div className="loader-container">
                        <CircularProgress size={80} color="primary" />
                    </div>
            }
        </div>
    )
}

export default Playlist
