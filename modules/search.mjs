import express from 'express'
import Page from './models/Page.mjs'

let router = express.Router()

/* 
LOOKUPS 
GET     /search/:query - returns list of pages that include query
*/
router.get('/:query', async (req, res) => {
    let { query } = req.params    

    let regex = new RegExp(query,'i');
    let pages = await Page.find({$or: [{ title: regex }, { content: regex }, { searchDescription: regex }]})
    
    if (pages.length == 0) return res.render("error", { error: "No results found for \"" + query + "\""})

    res.render('search', { pages: pages });    
})

export default router