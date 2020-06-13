const passport = require("passport")
const querystring = require("querystring")

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
                "playlist-modify-private",
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

    // app.get('/api/logout', (req, res) => {
    //   req.logout();
    //   res.redirect('/');
    // });

    // app.get('/api/current_user', (req, res) => {
    //   res.send(req.user);
    // });
}
