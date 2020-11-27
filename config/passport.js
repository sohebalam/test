import mongoose from "mongoose"
const User = mongoose.model("users")
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "130210432692-8dujh2mskmmpa0ij50imvvmuv0e7b322.apps.googleusercontent.com",
      clientSecret: "wyg0ZiGagZJ0Jm2u-Z556K8E",
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser)
        } else {
          new User({
            googleId: profile.id,
            name: profile.displayName,
            // firstname: _json.given_name,
            // lastname: _json.family_name,
            email: profile.emails[0].value,
            photo: profile.photos[0].value.split("?")[0],
            // locale: _json.locale,
          })
            .save()
            .then((user) => done(null, user))
        }
      })
    }
  )
)

export default GoogleStrategy
