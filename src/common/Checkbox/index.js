import React, { memo } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const CheckboxComponent = props => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    onChange={props.onChange}
                    checked={props.checked}
                    color="secondary"
                />
            }
            label={props.label}
        />
    )
}

function areEqual (prevProps, nextProps) {
    return prevProps.checked === nextProps.checked
}

export default memo(CheckboxComponent, areEqual)
