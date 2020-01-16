import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'

import Checkbox from '../../../common/Checkbox'

import { selectGenre } from '../../../store/inputs/actions'

import './genres.scss'

const Genres = props => {
    const inputReducer = useSelector(state => state.inputs)
    const dispatch = useDispatch()

    const handleGenreChange = (index) => {
        dispatch(selectGenre(index))
    }

    return (
        <div className="genres">
            <Grid container spacing={5}>
                {
                    inputReducer.genres.map( (genre, i) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={genre.label}>
                            
                                    <Checkbox
                                        onChange={() => handleGenreChange(i)}
                                        checked={genre.checked}
                                        label={genre.label}
                                        color="secondary"
                                    />
                                
                        </Grid>
                    ) )
                }
            </Grid>
        </div>
    )
}

export default Genres
