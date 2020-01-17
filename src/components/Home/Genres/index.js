import React from 'react'
import { useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

import { selectGenre } from '../../../store/inputs/actions'

import genresData from '../../../data/genres'

import './genres.scss'

const Genres = props => {
    const dispatch = useDispatch()

    const handleSelect = arr => {
        if( arr.length > 0 ) {
            const transformedData = arr.map(item => item.toLowerCase())
            dispatch(selectGenre(transformedData))
        }
        return null
    }

    return (
        <div className="genres">
            <Grid container spacing={5}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Autocomplete
                        multiple
                        options={genresData}
                        getOptionLabel={option => option}
                        onChange={(e, value) => handleSelect(value)}
                        renderInput={params => 
                            <TextField {...params} variant="standard" label="Search genre" fullWidth />  
                        }
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default Genres
