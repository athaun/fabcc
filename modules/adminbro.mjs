import AdminBro from "admin-bro"
import AdminBroExpress from "admin-bro-expressjs"
import AdminBroMongoose from "admin-bro-mongoose"
import mongoose from "mongoose"
import User from "./models/User.mjs"
import bcrypt from 'bcrypt'
import Page from "./models/Page.mjs"
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

AdminBro.registerAdapter(AdminBroMongoose)
const mongooseDB = await mongoose.connect("mongodb://localhost:27017/fabcc")

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

const PageResource = {
    resource: Page,
    options: {
        properties: {
            content: {
                type: 'richtext',
                custom: {
                    modules: {
                        toolbar: [['bold', 'italic'], ['link', 'image']]
                    },
                },                
            },
        }
    }
}


const options = {
    resources: [UserResource, PageResource],
    databases: [mongooseDB],
    dashboard: {
        component: AdminBro.bundle(path.join(__dirname, '/adminbro_dashboard.jsx'))
    },
    rootPath: "/admin",
    branding: {
        companyName: 'FABCC',
    }
}

const adminBro = new AdminBro(options)

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
    cookiePassword: 'some-secret-password-used-to-secure-cookie'
})

// Use this to create users (for now)
// const router = AdminBroExpress.buildRouter(adminBro)

export default router
