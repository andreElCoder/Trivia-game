const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema({
    username:String,
    password:String,
    avatar:String,
    imgName: String,
    imgPath: String,
    dateOfBirth : Date,
    address: String,
    email: String,
    highScore: {type: Number, default: 0}
},
    {
    timestamps: true
    }
)
const User = mongoose.model("User",userSchema)
module.exports = User