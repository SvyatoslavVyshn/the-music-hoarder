import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

const PlaylistItem = ({ track, token, deviceId, selectTrack }) => {
    return (
        <ListItem 
            alignItems="flex-start" 
            divider 
            button 
            onClick={() => selectTrack(track.uri)}
        >
            <ListItemAvatar>
                <Avatar alt={track.album.name} src={track.album.images[0].url}/>
            </ListItemAvatar>
            <ListItemText
                primary={track.name}
                secondary={track.artists.map( artist => artist.name ).join(', ')}
            />
            <IconButton
                aria-label="More"
                aria-owns={'add-btn'}
                aria-haspopup="true"
                title="save track"
                className="add-track-icon"
                onClick={() => ''}
            >
                <AddIcon />
            </IconButton>
        </ListItem>
    )
}

export default PlaylistItem
