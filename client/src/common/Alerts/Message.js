import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import Slide from "@material-ui/core/Slide"
import IconButton from "@material-ui/core/IconButton"
import { withStyles } from "@material-ui/core/styles"
import Clear from "@material-ui/icons/Clear"

import ProgressBar from "../ProgressBar"

const styles = () => ({
    button: {
        color: "#fff",
    },
})

const Message = ({ classes, danger, item, removeAlert }) => {
    const [showMessage, setShowMessage] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!showMessage) {
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
            <div
                className={`mui-alert-wrapper ${
                    danger ? "mui-danger-alert" : "mui-success-alert"
                }`}
            >
                <div className="mui-alert mui-alert-message">
                    <div className="mui-alert-content">
                        <div className="mui-alert-content-container">
                            <p className="status-message">{item.title}</p>
                            <p>
                                {item.text}
                                <span>{item.name && `[${item.name}]`}</span>
                            </p>
                        </div>
                    </div>

                    <div className="mui-alert-actions">
                        <IconButton
                            className={classes.button}
                            onClick={handleMessageRemove}
                        >
                            <Clear />
                        </IconButton>
                    </div>
                </div>

                {item.timeout && (
                    <ProgressBar
                        duration={2000}
                        interval={50}
                        onFinish={handleMessageRemove}
                    />
                )}
            </div>
        </Slide>
    )
}

export default withStyles(styles)(Message)
