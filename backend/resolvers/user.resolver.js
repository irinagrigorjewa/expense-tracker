import { users } from '../dummyData/data.js'
import User from '../models/user.model.js'

const userResolver = {
    Query: {
        // users: (parent, args, { req, res }, info) => {
        //     return users
        // },
        user: (_, { userId }) => {
            try {
                const user = users.findById(userId)
                return user

            } catch (error) {
                throw new Error(error)

            }
        },
        authUser: async (_, __, context) => {
            try {
                const user = await context.getUser()
                return user

            } catch (error) {
                throw new Error(error)

            }
        }
    },
    Mutation: {
        signUp: async (_, { input }, context) => {
            try {
                const { username, name, password, gender } = input
                if (!username || !name && !password && !gender) {
                    throw new Error("All fields are required")

                }
                const existingUser = await User.findOne({ username })
                if (existingUser) {
                    throw new Error("User already exists")
                }
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)
                const profilePic = `https://avatar.iran.liara.run/public/${gender === "male" ? "boy" : "girl"}?username=${username}`

                const newUser = new User({
                    username,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePicture: profilePic
                })
                await newUser.save()
                await context.login(newUser)
                return newUser
            } catch (error) {
                console.log(error)
                throw new Error(error)
            }
        },
        login: async (_, { input }, context) => {
            try {
                const { username, password } = input
                const { user } = await context.authenticate("graphql-local", { username, password })
                context.login(user)
                return user

            } catch (error) {
                throw new Error(error)
            }
        },
        logout: async (_, __, context) => {
            try {
                await context.logout()
                req.session.destroy((err) => {
                    if (err) { throw new Error(err) }

                })
                res.clearCookie("connect.sid")
                return { message: "Logged out successfully" }

            } catch (error) {
                throw new Error(error)
            }
        }
    }
}
export default userResolver;