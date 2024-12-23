import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'

import adminBro from './modules/adminbro.mjs'
import pages from './modules/pages.mjs'
import search from './modules/search.mjs'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

const app = express();

await mongoose.connect('mongodb://localhost:27017/fabcc')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(express.static(path.join(__dirname, 'public')))

app.use("/admin", adminBro)

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use("/pages", pages)
app.use("/search", search)

app.get('/store', (req, res) => {
    res.render("store")
})

app.get('/store/product/:id', (req, res) => {
    res.render("product", { id: req.params.id })
})

app.get('/store/cart', (req, res) => {
    res.render("cart") // { id: req.params.id }
})

app.get('/', (req, res) => {
    res.render("home")
})

app.all("*", (req, res) => {
    res.render("error", { error: `<h1>404</h1><br><p>The page you are looking for doesn't exist.</p>` })
})

app.listen(8090, () => {
    console.log("Listening")
})

export default app