import React from "react"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import { useSelector, useDispatch } from "react-redux"

import Moods from "./Moods"
import Genres from "./Genres"
import Playlist from "./Playlist"
import Player from "../Player"

import { getPlaylist } from "../../store/playlist/actions"
import { selectGenre } from "../../store/inputs/actions"
// import { login } from '../../store/auth/actions'

import genresData from "../../data/genres"

import "./home.scss"

function Home(props) {
    const dispatch = useDispatch()
    const inputs = useSelector((state) => state.inputs)
    const token = useSelector((state) => state.auth.access_token)

    const randomizeGenres = () => {
        var arr = []
        for (let i = 0; i < 5; i++) {
            var r = Math.floor(Math.random() * 125) + 1
            if (arr.indexOf(genresData[r]) === -1) {
                arr.push(genresData[r])
            }
        }
        dispatch(selectGenre(arr))
    }

    return (
        <div className="home">
            <div className="header">
                <div className="caption">
                    <Moods />
                    <Genres />
                    <ButtonGroup variant="contained" color="secondary">
                        <Button
                            onClick={() =>
                                dispatch(
                                    getPlaylist(
                                        token,
                                        inputs.moodValues,
                                        inputs.selectedGenres
                                    )
                                )
                            }
                        >
                            Search
                        </Button>
                        <Button onClick={randomizeGenres}>
                            Radnomize Genres
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="home-content">
                <Container maxWidth="lg">
                    <Playlist token={token} />
                </Container>
            </div>
            {token && <Player token={token} />}
        </div>
    )
}
export default Home
