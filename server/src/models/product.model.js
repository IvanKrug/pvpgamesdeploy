import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        required: true,
    }
},
 {
    timestamps: true,
})
export default mongoose.model('Product', productSchema)