import React from 'react'

import './login.scss'

function Login () {
    return (
        <div className="login">
            <div className="login-content">
                <h2 className="header"> Welcome to the Music Hoarder </h2>
                <p className="info">For full experience you need to have Spotify Premium account.</p>
                <a href="http://localhost:8888/login" className="login-button">Login with Spotify</a>
            </div>
        </div>
    )
}

export default Login