const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    age:{
        type:String,
        required:false,

    },
    bio:
    {
        type:String,
        required:false
    }

},{
    timestamps:true,
});

module.exports = mongoose.models.Users || mongoose.model("Users",userSchema);