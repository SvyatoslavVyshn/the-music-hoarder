import React from "react"
import { useDispatch } from "react-redux"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"

import { selectGenre } from "../../../store/inputs/actions"

import genresData from "../../../data/genres"

import "./genres.scss"

const CssTextField = withStyles({
    root: {
        "& label": {
            color: "#fff",
        },
        "& label.Mui-focused": {
            color: "#fff",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#fff",
        },
        "& .MuiOutlinedInput-root": {
            color: "#fff",
            "& fieldset": {
                borderColor: "#fff",
            },
            "&:hover fieldset": {
                borderColor: "#fff",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#fff",
            },
        },
    },
})(TextField)

const Genres = (props) => {
    const dispatch = useDispatch()
    const handleSelect = (arr) => {
        if (arr.length > 0) {
            const transformedData = arr.map((item) => item.toLowerCase())
            dispatch(selectGenre(transformedData))
        } else {
            dispatch(selectGenre([]))
        }
    }

    return (
        <div className="genres">
            <Grid container spacing={5} justify="center">
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                    <Autocomplete
                        multiple
                        options={genresData}
                        getOptionLabel={(option) => option}
                        onChange={(e, value) => handleSelect(value)}
                        renderInput={(params) => (
                            <CssTextField
                                {...params}
                                variant="outlined"
                                label="Select genres"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default Genres
