import mongoose , {Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String
    }

},{timestamps: true})

userSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password , 10)
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}

userSchema.methods.generateAccessToken = function(){
    //sign method takes three main arguments:Payload: The data you want to include in the token.Secret Key: A secret string to sign the token, ensuring its integrity.Options: Various options for the token, such as expiration time.
    return jwt.sign(
        {
            _id: this._id,
            username:this.username,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY

        }
    )
}

export const User = mongoose.model("User" , userSchema)