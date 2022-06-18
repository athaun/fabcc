import express from 'express'
import List from './models/List.mjs'
import Asset from './models/Asset.mjs'

let router = express.Router()

router.get('/:list/add', (req, res) => {
    res.render("add_asset", { list: req.params.list })
})

router.get('/:list', async (req, res) => {
    let listName = req.params.list
    const listCount = await List.count({ name: listName }) // Count of lists matching the request (should be <= 1)
    if (listCount == 0) {
        res.render("add_asset", { list: req.params.list })
        return
    }

    let { assets: assetIds } = await List.findOne({ name: listName })
    let assets = await Asset.find({ _id: { $in: assetIds } })

    res.render("list_viewer", { listName, assets })
    
})

router.post('/:list', async (req, res) => {
    try {
        let newAsset = new Asset({
            name: req.body.name,
            buyPrice: parseFloat(req.body.buyPrice),
            quantity: parseFloat(req.body.quantity)
        })
        newAsset.save()
        
        const listCount = await List.count({ name: req.params.list }) // Count of lists matching the request (should be <= 1)
        if (listCount == 0) {
            // Create a new list if no list with this name exists
            let newList = new List({ name: req.params.list })
            newList.assets.push(newAsset._id)            
            newList.save()

            res.send({res: `Created list "${req.params.list}" and added ${req.body.name} to it.`})
        } else {
            
            // Load all of the assets contained in the list
            let { assets: assetIds } = await List.findOne({ name: req.params.list })
            let assets = await Asset.find({ _id: { $in: assetIds } })

            // Check if this name is already in the list
            if (assets.some(e => e.name == req.body.name)) {
                res.send({res: `${req.body.name} is already in ${req.params.list}.`})
                return
            }

            // If the name isn't in the list, push it to the assets array
            await List.updateOne({ name: req.params.list }, {
                $push: { assets: newAsset._id }
            })       

            res.send({res: `Added ${req.body.name} to ${req.params.list}.`})    
        }
    } catch (error) {
        console.log(error)
        res.send({res: `Could not add ${req.body.name} to ${req.params.list}.`})
    }   
})

router.patch('/:list', (req, res) => {
    res.send(`Route not yet implemented.`)
})

router.delete('/:list', async (req, res) => {
    let { assets: assetIds } = await List.findOne({ name: req.params.list })
    let assets = await Asset.find({ _id: { $in: assetIds } })
    for (let i in assets) {
        if (assets[i].name == req.body.name) {
            await Asset.findByIdAndDelete(assets[i]._id)
            res.send(`Deleted asset: ${assets[i]}`)
            return
        }
    }
})

export default router