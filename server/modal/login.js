
const  mongoose = require("mongoose");
const Schema = mongoose.Schema;

var LoginSchema = new Schema({
    FullName:{
        type:String,
        default: null,
        require: true,
        
    },
    Email:{
        type:String,
        require: true,
        default: null,
        unique: true
    },
    PassWord:{
        type:String,
        require: true,
        default: null,
     
    }
})


module.exports = mongoose.model('LoginSchema', LoginSchema)