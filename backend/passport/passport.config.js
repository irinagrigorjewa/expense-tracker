import passport from "passport"
import User from "../models/user.model.js"
import { GraphQLLocalStrategy } from "graphql-passport"

export const configurePassport = async () => {
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id)
            done(null, user)

        } catch (error) {
            done(error)
        }
    })
    passport.use(
        new GraphQLLocalStrategy(async (username, password, done) => {
            try {
                const user = await User.findOne({ username })
                if (!user) {
                    throw new Error("Invalid username or password")
                }
                const validPassport = await bcrypt.compare(password, user.passport)
                if (!validPassport) {
                    throw new Error("Invalid password")
                }
            } catch (error) {
                done(error)
            }
        })
    )
}