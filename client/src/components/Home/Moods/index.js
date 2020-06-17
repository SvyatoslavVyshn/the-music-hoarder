import React from "react"
import { useSelector, useDispatch } from "react-redux"
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

    const handleClear = (name) => {
        dispatch(changeMood(name, 0))
    }

    return (
        <div className="moods">
            {moods.map((mood) => (
                <Slider
                    key={mood.label}
                    title={mood.title}
                    onChange={handleMoodChange}
                    label={mood.label}
                    min={parseFloat(mood.min)}
                    max={parseFloat(mood.max)}
                    value={parseFloat(inputReducer.moodValues[mood.targetCode])}
                    textValue={inputReducer.moodValues[mood.code]}
                    name={mood.targetCode}
                    step={mood.step}
                    onClear={handleClear}
                />
            ))}
        </div>
    )
}

export default Moods
