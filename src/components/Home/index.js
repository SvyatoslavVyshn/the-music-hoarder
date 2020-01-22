import React from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { useSelector, useDispatch } from 'react-redux'

import Moods from './Moods'
import Genres from './Genres'
import Playlist from './Playlist'
import Player from '../Player'

import { getPlaylist } from '../../store/playlist/actions'
// import { login } from '../../store/auth/actions'

import "./home.scss"

function Home (props) {
    const dispatch = useDispatch()
    const inputs = useSelector(state => state.inputs)
    const token = useSelector(state => state.auth.access_token)

   

    return (
        <div className="home">
            <div className="header">
                <div className="caption">
                    <Moods/>
                    <Genres/>
                    <Button 
                        variant="contained"
                        color="secondary"
                        onClick={() => dispatch(
                            getPlaylist(token, inputs.moodValues, inputs.selectedGenres)
                        )}
                    >
                        Search
                    </Button>
                </div>
            </div>
            <div className="home-content">
                <Container maxWidth="lg">
                    <Playlist />
                </Container>
            </div>
            {token && <Player token={token}/>}
        </div>
    )
}
export default Home