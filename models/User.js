const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema({
    spotifyId: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
        required: true,
    },
    expiresIn: {
        type: Number,
        required: true,
    },
    profile: {
        username: String,
        displayName: String,
        photos: [],
        country: String,
        product: String,
    },
})

mongoose.model("users", userSchema)
