import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'

import adminBro from './modules/adminbro.mjs'
import lookups from './modules/lookups.mjs'
import lists from './modules/lists.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();

await mongoose.connect('mongodb://localhost:27017/assets')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(express.static(path.join(__dirname, 'public')))

app.use("/admin", adminBro)

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use("/asset", lookups)
app.use("/lists", lists)

/* HOME PAGE */
app.get('/', (req, res) => {
    res.render("home")
})

app.all("*", (req, res) => {
    res.render("error", { error: `The page you are looking for doesn't exist.` })
})

app.listen(8090, () => {
    console.log("Listening")
})

/* 
* Lookups *
GET     /asset/:asset - returns asset lookup page

* Lists *
GET     /lists/:list   - Return a full list of assets
GET     /lists/:list/add - Add an asset to list

POST    /lists/:list   - Add an asset to list
PATCH   /lists/:list   - Edit an asset in list
DELETE  /lists/:list   - Remove an asset from list
*/

export default app