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
        default: null
    },
    premium: {
        type: Boolean,
        default: null
    }


})

const Game = mongoose.model('Game', gameSchema);
export default Game;