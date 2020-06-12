import React from "react"
import { useSelector, useDispatch } from "react-redux"
import Grid from "@material-ui/core/Grid"
import Slider from "../../../common/Slider"

import moods from "../../../data/moods"

import { changeMood } from "../../../store/inputs/actions"

import "./moods.scss"

const Moods = (props) => {
    const dispatch = useDispatch()
    const inputReducer = useSelector((state) => state.inputs)

    const handleMoodChange = (event, value, name) => {
        dispatch(changeMood(name, value))
    }

    return (
        <div className="moods">
            {moods.map((mood) => (
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
            ))}
        </div>
    )
}

export default Moods
