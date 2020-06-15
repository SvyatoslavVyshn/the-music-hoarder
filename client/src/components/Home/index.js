import React, { useEffect } from "react"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
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
import { getUser, getNewToken } from "../../store/auth/actions"
// import { addAlert } from "../../store/alerts/actions"

import genresData from "../../data/genres"

import "./home.scss"

function Home(props) {
    const dispatch = useDispatch()
    const inputs = useSelector((state) => state.inputs)
    const { access_token, user } = useSelector((state) => state.auth)

    useEffect(() => {
        // dispatch(
        //     addAlert({
        //         title: "Hello",
        //         text: "Hello",
        //         error: false,
        //     })
        // )
        dispatch(getUser())
    }, [dispatch])

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
                                    color="primary"
                                    disabled={
                                        inputs.selectedGenres.length < 1 ||
                                        inputs.selectedGenres.length > 5
                                    }
                                    onClick={() =>
                                        dispatch(
                                            getPlaylist(
                                                access_token,
                                                inputs.moodValues,
                                                inputs.selectedGenres
                                            )
                                        )
                                    }
                                >
                                    Search
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={randomizeGenres}
                                >
                                    Radnomize Genres
                                </Button>
                                <Button onClick={() => dispatch(getNewToken())}>
                                    New Token
                                </Button>
                            </CardActions>
                        </Card>

                        <Card>
                            <CardContent>
                                <Playlist token={access_token} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>

            {access_token && <Player user={user} token={access_token} />}
        </div>
    )
}
export default Home
