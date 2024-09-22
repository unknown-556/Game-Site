import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true
    },
    image: {
        type: Number,
        required: true,
        min: 1,
        max: 5 
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const News = mongoose.model('Game', newsSchema);
export default News;