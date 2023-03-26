const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        
        unique:true// tạo user giống thì lỗi
    },
    email:{
        type:String,
        required:true,
        
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    
    
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)