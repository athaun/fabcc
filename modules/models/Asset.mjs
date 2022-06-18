import mongoose from 'mongoose'

const Asset = mongoose.model('Asset', {
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

export default Asset