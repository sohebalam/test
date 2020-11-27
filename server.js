import express from "express"
import mongoose from "mongoose"
import passport from "passport"
import cookieSession from "cookie-session"
import bodyParser from "body-parser"
import path from "path"
import user from "./models/User.js"
import passportConfig from "./config/passport.js"
import auth from "./routes/auth.js"

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// const auth = require("./routes/auth")

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["somesecretsauce"],
  })
)

// MongoDB configuration
const db = "mongodb://localhost:27017/test"

// Use mongoose to connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.log(err))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Passport config

//Use routes from routes folder
app.use("/auth", auth)
//app.use("/api/posts", posts)

// require("./routes/posts.js")(app);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`App running on port ${port}`))
