import AdminBro from "admin-bro"
import AdminBroExpress from "admin-bro-expressjs"
import AdminBroMongoose from "admin-bro-mongoose"
import mongoose from "mongoose"
import User from "./models/User.mjs"
import bcrypt from 'bcrypt'

AdminBro.registerAdapter(AdminBroMongoose)
const mongooseDB = await mongoose.connect("mongodb://localhost:27017/assets")

const UserResource = {
    resource: User,
    options: {
        properties: {
            encryptedPassword: {
                    isVisible: false,
                },
                password: {
                type: "string",
                isVisible: {
                    list: false, edit: true, filter: false, show: false
                },
            }
        },
        actions: {
            new: {
                before: async (request) => {
                    if (request.payload.password) {
                        request.payload = {
                            ...request.payload,
                            encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                            password: undefined,
                        };
                    }
                    return request;
                },
            },
        },
    },
}

const adminBro = new AdminBro({
  resources: [UserResource],
  databases: [mongooseDB],
  rootPath: "/admin",
})

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
        const user = await User.findOne({ email })
        if (user) {
            console.log("Trying auth " + email + " | " + user.encryptedPassword)
            const matched = await bcrypt.compare(password, user.encryptedPassword)
            if (matched) {
                console.log("Auth successful")
                return user
            }
        }
        return false
    },
    cookiePassword: 'some-secret-password-used-to-secure-cookie',
})

// Use this to create users (for now)
// const router = AdminBroExpress.buildRouter(adminBro)

export default router
