import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5 
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    price: {
        type: String
    },
    status: {
        type: String,
        default: "Available"
    },
    phoneNumber: {
        type: String,
        ref: "User"
    },
    email: {
        type: String,
        ref: "User"
    },
    rating: {
        type: Number,
        default: 0 
    },
    numReviews: {
        type: Number,
        default: 0 
    },
    reviews: [reviewSchema], 
    paid: {
        type: Boolean,
        default: false
    },
    premium: {
        type: Boolean,
        default: false 
    },
    premiumPaid: {
        type: Boolean,
        default: false
    }
});

const Game = mongoose.model('Game', gameSchema);
export default Game;
