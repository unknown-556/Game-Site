import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema ({
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
