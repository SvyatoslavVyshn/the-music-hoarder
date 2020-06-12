import React from "react"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
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
        for (let i = 0; i < Math.random() * 5; i++) {
            var r = Math.floor(Math.random() * 125) + 1
            if (arr.indexOf(genresData[r]) === -1) {
                arr.push(genresData[r])
            }
        }
        dispatch(selectGenre(arr))
    }

    return (
        <div className="home">
            {/* <Container maxWidth="lg"> */}
            <div className="home-container">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={4} lg={3}>
                        <Card style={{ marginBottom: "20px" }}>
                            <CardContent>
                                <Moods />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={9}>
                        <Card style={{ marginBottom: "20px" }}>
                            <CardContent>
                                <Genres />
                            </CardContent>
                            <CardActions>
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
                            </CardActions>
                        </Card>

                        <Card>
                            <CardContent>
                                <Playlist token={token} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            {/* </Container> */}
            {token && <Player token={token} />}
        </div>
    )
}
export default Home
