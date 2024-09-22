import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      userName: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      phoneNumber: {
        type: String,
        required: true,
        unique: true
      },
      isPaid: {
        type: Boolean,
        default: false
      },

})

const User = mongoose.model('User', userSchema);
export default User;