import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'

import Moods from './Moods'
import Genres from './Genres'

import { login } from '../../store/auth/actions'

import "./home.scss"

function Home () {
    const dispatch = useDispatch()
    const [tabValue, setTabValue] = useState(0);


    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div className="home">
            <div className="header">
                <div className="caption">
                    <h4>Welcome User!</h4>
                    <p>Note that max quantity of selected genres is 5!</p>
                </div>
            </div>
            <div className="search-area">
                <Paper square>
                    <Tabs
                        indicatorColor="primary"
                        textColor="primary"
                        value={tabValue}
                        onChange={handleTabChange}
                    >
                        <Tab label="Moods"/>
                        <Tab label="Genres"/>
                    </Tabs>
                </Paper>

                { tabValue === 0 && (
                    <Paper square>
                        <Moods />
                    </Paper>
                )}

                { tabValue === 1 && (
                    <Paper square>
                        <Genres />
                    </Paper>
                )}
            </div>
        </div>
    )
}
export default Home