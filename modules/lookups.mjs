import express from 'express'
import Asset from './models/Asset.mjs'

let router = express.Router()

/* 
LOOKUPS 
GET     /res/:asset - returns asset info page
*/
router.get('/:asset', async (req, res) => {
    let { asset } = req.params    

    let foundAsset = await Asset.findOne({ name: asset })
    if (foundAsset == null) res.render("error", { error: "Could not find asset " + asset})

    res.render('asset', { asset: foundAsset });    
})

export default router