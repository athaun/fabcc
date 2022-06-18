import mongoose from 'mongoose'
const { Schema } = mongoose;

const AssetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    buyPrice: {
        type: Number,
        default: null
    },
    quantity: {
        type: Number,
        default: null
    }
})

const Asset = mongoose.model('Asset', AssetSchema)

export default Asset