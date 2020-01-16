import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Slide from '@material-ui/core/Slide'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import Clear from '@material-ui/icons/Clear'

const styles = () => ({
    button: {
        color: '#fff'
    }
})

const Message = ({ classes, danger, item, removeAlert }) => {
    const [showMessage, setShowMessage] = useState(true)
    const dispatch = useDispatch()


    useEffect(() => {
        if(!showMessage) {
            setTimeout(() => {
                dispatch(removeAlert(item.id))
            }, 500)
        }
    }, [showMessage, dispatch, item.id, removeAlert])

    const handleMessageRemove = () => {
        setShowMessage(false)
    }

    return (
        <Slide direction="left" in={showMessage} mountOnEnter unmountOnExit>
            <div className={ `alert-wrapper ${danger ? 'danger-alert' : 'success-alert'}` }>
                <div className="alert alert-message">
                    <div className="alert-content">
                        <div className="alert-content-container">
                            <p className="status-message">{item.title}</p>
                            <p>{item.text}</p>
                        </div>
                    </div>

                    <div className="alert-actions">
                        <IconButton
                            className={classes.button}
                            onClick={handleMessageRemove}
                        >
                            <Clear />
                        </IconButton>
                    </div>

                </div>
            </div>
        </Slide>
    )
}

export default withStyles(styles) (Message)