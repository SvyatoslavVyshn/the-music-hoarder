import React from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import AddIcon from "@material-ui/icons/Add"

const PlaylistItem = ({
    track,
    selectTrack,
    trackSave,
    // playAudio,
    product,
    // playingUrl,
    // playing,
}) => {
    const handlePlay = () => {
        if (product === "premium") {
            selectTrack(track.uri)
        } else {
            return
            // playAudio(track.preview_url)
        }
    }

    const secondaryText =
        product === "premium" ? (
            track.artists.map((artist) => artist.name).join(", ")
        ) : (
            <a
                target="_blank"
                className="play-on"
                href={track.external_urls.spotify}
            >
                Listen on Spotify
            </a>
        )

    return (
        <ListItem
            alignItems="flex-start"
            divider
            style={{
                cursor: "pointer",
            }}
        >
            <ListItemAvatar onClick={handlePlay}>
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
                onClick={handlePlay}
                primary={track.name}
                secondary={secondaryText}
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
