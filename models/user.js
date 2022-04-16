import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    username:{
        type: String,
        required: true // giong nhu NOT NULL
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    created_at:{
        type: Date,
        default: new Date(),
    }
})

const User = mongoose.model('users',userSchema)

export default User
