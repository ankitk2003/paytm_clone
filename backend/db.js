import mongoose, { Schema, model } from "mongoose";

const userSchema=new Schema({
    username:String,
    password:String,
    firstname:String,
    lastname:String
})

const User=mongoose.model("User",userSchema);
export{User}