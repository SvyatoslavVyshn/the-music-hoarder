const axios = require("axios")
const passport = require("passport")
const querystring = require("querystring")
const keys = require("../config/keys")
const mongoose = require("mongoose")
const User = mongoose.model("users")

module.exports = (app) => {
    app.get(
        "/auth/login",
        passport.authenticate("spotify", {
            scope: [
                "streaming",
                "user-read-birthdate",
                "user-read-email",
                "user-read-private",
                "user-read-playback-state",
                "user-read-currently-playing",
                "user-modify-playback-state",
                "user-library-read",
                "user-library-modify",
                "playlist-modify-public",
            ],
        })
    )

    app.get(
        "/auth/callback",
        passport.authenticate("spotify", { failureRedirect: "/login" }),
        (req, res) => {
            res.redirect(
                "/home/#" +
                    querystring.stringify({
                        access_token: req.user.accessToken,
                        expires_in: req.user.expiresIn,
                    })
            )
        }
    )

    app.get("/auth/refresh-token", async (req, res, next) => {
        const buff = new Buffer.from(
            `${keys.spotifyClientID}:${keys.spotifyClientSecret}`
        )
        const base64data = buff.toString("base64")

        const data = querystring.stringify({
            refresh_token: req.user.refreshToken,
            grant_type: "refresh_token",
        })

        try {
            const token = await axios.post(
                "https://accounts.spotify.com/api/token",
                data,
                {
                    headers: {
                        Authorization: "Basic " + base64data,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            )

            const user = await User.findOne({ spotifyId: req.user.spotifyId })

            if (!user) {
                const error = new Error("User not found!")
                error.statusCode = 422
                throw error
            }

            user.accessToken = token.data.access_token
            const result = await user.save()

            res.status(200).send({
                access_token: result.accessToken,
            })
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        }
    })

    // app.get('/api/logout', (req, res) => {
    //   req.logout();
    //   res.redirect('/');
    // });

    app.get("/api/current_user", (req, res) => {
        res.send(req.user.profile)
    })
}
