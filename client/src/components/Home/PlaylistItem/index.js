import React, { useState, useEffect } from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import AddIcon from "@material-ui/icons/Add"
import ClearIcon from "@material-ui/icons/Clear"

const PlaylistItem = ({
    track,
    selectTrack,
    trackSave,
    trackDelete,
    product,
    handleAdded,
}) => {
    const handlePlay = () => {
        if (product === "premium") {
            selectTrack(track.uri)
        } else {
            return
            // playAudio(track.preview_url)
        }
    }

    const handleTrackActions = () => {
        if (track.added) {
            trackDelete(track.id)
            handleAdded(track.id)
        } else {
            trackSave(track.id)
            handleAdded(track.id)
        }
    }

    const secondaryText =
        product === "premium" ? (
            track.artists.map((artist) => artist.name).join(", ")
        ) : (
            <span>
                {track.artists.map((artist) => artist.name).join(", ")}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="play-on"
                    href={track.external_urls.spotify}
                    style={{ marginLeft: 10 }}
                >
                    Listen on Spotify
                </a>
            </span>
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
                title={
                    track.added
                        ? "remove from your library"
                        : "add to your library"
                }
                onClick={handleTrackActions}
            >
                {track.added ? <ClearIcon /> : <AddIcon />}
            </IconButton>
        </ListItem>
    )
}

export default PlaylistItem
