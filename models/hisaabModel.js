const mongoose = require('mongoose')

const hisaabSchema = mongoose.Schema({
    title:{
        type:String,
        trim:true,
        minLength:3,
        maxLength:100,
        required:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    editpermissions:{
        type:Boolean,
        default:false,
    },
    shareable:{
        type:Boolean,
        default:false,
    },
    encrypted:{
        type:Boolean,
        default:false,
    },
    passcode:{
        type:String,
        default:"",
    } //editable hoga to ek password ayega
},{timestamps: true})
module.exports = mongoose.model("hisaab",hisaabSchema)