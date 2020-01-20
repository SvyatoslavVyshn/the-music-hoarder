import React from 'react'
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch } from 'react-redux'

import Moods from './Moods'
import Genres from './Genres'

import { getPlaylist } from '../../store/playlist/actions'
// import { login } from '../../store/auth/actions'

import "./home.scss"

function Home () {
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
            <div className="search-area">
            </div>
        </div>
    )
}
export default Home