const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [50, 'Username cannot exceed 50 characters']
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    hisaab:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"hisaab"
    }]
})

module.exports = mongoose.model("user",userSchema)