const { Module } = require("module");
const  mongoose = require("mongoose");

var LoginSchema = new mongoose.Schema({
    FullName:{
        type:String,
        require: true
    },
    Email:{
        type:String,
        require: true
    },
    PassWord:{
        type:String,
        require: true
    }
})


module.exports = mongoose.Model('LoginSchema', LoginSchema)