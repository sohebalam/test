import passport from "passport"
import express from "express"
const auth = express()

auth.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
)

auth.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/profile")
})

auth.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/")
})

auth.get("/current_user", (req, res) => {
  res.send(req.user)
})

export default auth
