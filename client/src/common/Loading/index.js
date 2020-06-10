import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import './loading.scss'

const Loading = props => {
    return (
        <div className="loading-component">
            {
                props.pending ? <CircularProgress color="secondary" size={props.size} /> : props.children
            }
        </div>
    )
}

export default Loading