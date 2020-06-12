import React, { memo } from "react"
import Slider from "@material-ui/core/Slider"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Tooltip from "@material-ui/core/Tooltip"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import { withStyles } from "@material-ui/core/styles"

import "./slider.scss"

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.87)",
        color: theme.palette.common.white,
        boxShadow: theme.shadows[1],
        fontSize: 15,
    },
}))(Tooltip)

const SliderComponent = (props) => {
    return (
        <div className="slider-container">
            <Grid container spacing={2} justify="space-between">
                <Grid item>
                    <Typography
                        style={{ fontSize: "0.9rem" }}
                        id="discrete-slider"
                        gutterBottom
                    >
                        {props.label}
                    </Typography>
                </Grid>
                {props.title && (
                    <Grid item>
                        <LightTooltip title={props.title}>
                            <HelpOutlineIcon fontSize="small" />
                        </LightTooltip>
                    </Grid>
                )}
            </Grid>
            <Slider
                onChange={(e, value) => props.onChange(e, value, props.name)}
                defaultValue={props.defaultValue}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={props.step}
                min={props.min}
                max={props.max}
                value={props.value}
                name={props.name}
            />
        </div>
    )
}

function areEqual(prevProps, nexProps) {
    return (
        prevProps.value === nexProps.value &&
        prevProps.value[0] === nexProps.value[0] &&
        prevProps.value[1] === nexProps.value[1] &&
        prevProps.name === nexProps.name
    )
}

export default memo(SliderComponent, areEqual)
