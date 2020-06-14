const express = require("express")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const passport = require("passport")
const bodyParser = require("body-parser")
const keys = require("./config/keys")

require("./models/User")
require("./services/passport")

mongoose.Promise = global.Promise
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const app = express()

app.use(bodyParser.json())
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
)
app.use(passport.initialize())
app.use(passport.session())

require("./routes/auth")(app)

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))

    const path = require("path")
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

app.use((error, req, res, next) => {
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({ message: message, data: data })
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
