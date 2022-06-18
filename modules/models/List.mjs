import mongoose from 'mongoose'
const { Schema } = mongoose;

const List = mongoose.model('List', {
    name: {
        type: String,
        required: true
    },
    listType: { // Determines how the list is rendered
        type: String,
        enum: ["watch", "portfolio"],
        lowercase: true,
        default: "watch"
    },
    assets: [{ type: Schema.Types.ObjectId, ref: 'Asset' }]
})

export default List