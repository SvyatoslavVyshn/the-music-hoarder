import React from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import AddIcon from "@material-ui/icons/Add"

const PlaylistItem = ({ track, selectTrack, trackSave }) => {
    return (
        <ListItem
            alignItems="flex-start"
            divider
            style={{
                cursor: "pointer",
            }}
        >
            <ListItemAvatar onClick={() => selectTrack(track.uri)}>
                <Avatar
                    alt={track.album.name}
                    src={
                        track.album.images && track.album.images.length >= 1
                            ? track.album.images[0].url
                            : ""
                    }
                />
            </ListItemAvatar>
            <ListItemText
                onClick={() => selectTrack(track.uri)}
                primary={track.name}
                secondary={track.artists
                    .map((artist) => artist.name)
                    .join(", ")}
            />
            <IconButton
                aria-label="More"
                aria-owns="add-btn"
                aria-haspopup="true"
                title="add to your library"
                onClick={() => trackSave(track.id)}
            >
                <AddIcon />
            </IconButton>
        </ListItem>
    )
}

export default PlaylistItem
