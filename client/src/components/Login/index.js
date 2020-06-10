import React from "react"

import "./login.scss"

function Login() {
    return (
        <div className="login">
            <div className="login-content">
                <div className="auth-section">
                    <h2>Welcome</h2>
                    <p>To The Music Hoarder!</p>
                    <a
                        href="http://localhost:8888/login"
                        className="login-button"
                    >
                        Login with Spotify
                    </a>
                </div>
                <div className="explain-section">
                    <ul className="feature-list">
                        <li className="feature-item">
                            This application is based on Spotify Web API.
                        </li>
                        <li className="feature-item">
                            For full expirience you need to have Spotify premium
                            account.
                        </li>
                        <li className="feature-item">
                            Authorization is implemented with Spotify OAuth2
                            protocol.
                        </li>
                        <li className="feature-item">
                            You can search tracks using advanced search
                            criterias.
                        </li>
                        <li className="feature-item">
                            You can search tracks by genres.
                        </li>
                        <li className="feature-item">
                            You can save tracks to your library.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Login
