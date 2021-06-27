const JwtStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const CONSTANTS = require('../common/Constants')
const MongoClient = require('../MongoClient')

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: CONSTANTS.jwt
}

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const db = await MongoClient.db('tattoo')
        const usersCollection = await db.collection('users')
        const user = await usersCollection.findOne({ login: payload.login })
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      } catch (e) {
        console.log(e)
      }
    })
  )
}
