import React from "react"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"

import "./navbar.scss"

const styles = {
    root: {
        flexGrow: 1,
    },
    navHeader: {
        fontWeight: "lighter",
        fontSize: "2em",
        fontFamily: "Ubuntu",
    },
}

const NavBar = (props) => {
    const { classes } = props
    return (
        <div className={classes.root}>
            <AppBar
                position="static"
                style={{
                    background: "#fff",
                    boxShadow: "none",
                    color: "#2196f3",
                    zIndex: 10,
                }}
            >
                <Toolbar>
                    <Typography
                        className={classes.navHeader}
                        variant="h2"
                        color="inherit"
                        style={{ flex: 1 }}
                    >
                        The Music Hoarder
                    </Typography>
                    <div>
                        {props.isAuth && (
                            <Button
                                onClick={props.logout}
                                variant="outlined"
                                color="inherit"
                            >
                                <p style={{ marginRight: 5 }}>Logout</p>{" "}
                                <ExitToAppIcon />
                            </Button>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withStyles(styles)(NavBar)
