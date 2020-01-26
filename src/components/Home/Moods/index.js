import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Slider from '../../../common/Slider'

import moods from '../../../data/moods'

import { changeMood } from '../../../store/inputs/actions'

import './moods.scss'

const Moods = props => {
    const dispatch = useDispatch()
    const inputReducer = useSelector( state => state.inputs )

    const handleMoodChange = (event, value, name) => {
        dispatch(changeMood(name, value))
    }

    return (
        <div className="moods">
            <Grid container spacing={8}>
                {moods.map( mood => (
                        <Grid item xl={3} lg={3} md={4} sm={6} xs={12} key={mood.label}>
                            <Slider
                                title={mood.title}
                                onChange={handleMoodChange}
                                label={mood.label}
                                min={parseFloat(mood.min)}
                                max={parseFloat(mood.max)}
                                value={parseFloat(inputReducer.moodValues[mood.targetCode])}
                                textValue={inputReducer.moodValues[mood.code]}
                                name={mood.targetCode}
                                step={mood.step}
                            />
                        </Grid>
                    ) 
                )}
            </Grid>
        </div>
    )
}

export default Moods
