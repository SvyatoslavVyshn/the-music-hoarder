import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

import Checkbox from '../../../common/Checkbox'

import { selectGenre, searchGenre } from '../../../store/inputs/actions'

import genresData from '../../../data/genres'

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
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Autocomplete
                        multiple
                        options={genresData}
                        getOptionLabel={option => option.label}
                        onChange={(e, value) => dispatch(searchGenre(value))}
                        renderInput={params => 
                            <TextField {...params} variant="standard" label="Search genre" fullWidth />  
                        }
                    />
                </Grid>
                {
                    inputReducer.genres.map( (genre, i) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={genre.label}>
                            
                                    <Checkbox
                                        onChange={() => handleGenreChange(genre.label)}
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
