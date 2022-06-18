import AdminBro from 'admin-bro'
import AdminBroExpress from 'admin-bro-expressjs'
import AdminBroMongoose from 'admin-bro-mongoose'
import mongoose from 'mongoose'

AdminBro.registerAdapter(AdminBroMongoose)
const mongooseDB = await mongoose.connect('mongodb://localhost:27017/assets')

const adminBro = new AdminBro({
    resources: [],
    databases: [mongooseDB],
    rootPath: '/admin',
})

const router = AdminBroExpress.buildRouter(adminBro)

export default router