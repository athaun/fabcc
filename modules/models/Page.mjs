import mongoose from 'mongoose'

const Page = mongoose.model('Page', {
    title: String,
    content: String,
})

export default Page