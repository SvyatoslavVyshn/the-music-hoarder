import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"

import { selectGenre } from "../../../store/inputs/actions"

import genresData from "../../../data/genres"

import "./genres.scss"

// const CssTextField = withStyles({
//     root: {
//         "& label": {
//             color: "#fff",
//         },
//         "& label.Mui-focused": {
//             color: "#fff",
//         },
//         "& .MuiInput-underline:after": {
//             borderBottomColor: "#fff",
//         },
//         "& .MuiOutlinedInput-root": {
//             color: "#fff",
//             "& fieldset": {
//                 borderColor: "#fff",
//             },
//             "&:hover fieldset": {
//                 borderColor: "#fff",
//             },
//             "&.Mui-focused fieldset": {
//                 borderColor: "#fff",
//             },
//         },
//     },
// })(TextField)

const Genres = (props) => {
    const [touched, setTouched] = useState(false)

    const selectedGenres = useSelector((state) => state.inputs.selectedGenres)
    const dispatch = useDispatch()
    const handleSelect = (arr) => {
        if (arr && arr.length > 0) {
            dispatch(selectGenre(arr))
        } else {
            dispatch(selectGenre([]))
        }
    }

    return (
        <div className="genres">
            <Autocomplete
                value={selectedGenres}
                multiple
                options={genresData}
                getOptionLabel={(option) => option}
                onChange={(e, value) => handleSelect(value)}
                onFocus={() => setTouched(true)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Select genres"
                        fullWidth
                    />
                )}
            />
            {touched && selectedGenres.length < 1 && (
                <p className="error-text">You must provide minimum 1 genre!</p>
            )}
            {touched && selectedGenres.length > 5 && (
                <p className="error-text">You can provide maximum 5 genres!</p>
            )}
        </div>
    )
}

export default Genres
