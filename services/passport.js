const passport = require("passport")
const SpotifyStrategy = require("passport-spotify").Strategy
const mongoose = require("mongoose")
const keys = require("../config/keys")

const User = mongoose.model("users")

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})

passport.use(
    new SpotifyStrategy(
        {
            clientID: keys.spotifyClientID,
            clientSecret: keys.spotifyClientSecret,
            callbackURL: keys.spotifyRedirectURI,
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ spotifyId: profile.id })
            if (existingUser) {
                existingUser.accessToken = accessToken
                existingUser.refreshToken = refreshToken
                existingUser.expiresIn = 3600000
                await existingUser.save()

                return done(null, existingUser)
            }

            const user = await new User({
                spotifyId: profile.id,
                accessToken,
                refreshToken,
                expiresIn: 3600000,
                profile: {
                    username: profile.username,
                    displayName: profile.displayName,
                    photos: profile.photos,
                    country: profile.country,
                    product: profile.product,
                },
            }).save()

            done(null, user)
        }
    )
)
