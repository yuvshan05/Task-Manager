import { asyncHandler } from "../utils/assynHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import mongoose from "mongoose"
import {User} from "../models/users.models.js"
import jwt from "jsonwebtoken"


const generateAccessAndRefreshTokens = async(userId)=>{
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        //ab dono tokens generate for that particular user but humlog refreshtoken save v kar rehe hai 
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken , refreshToken}
    }catch(err){
        throw new apiError(400 , "something went wrong generating refresh token and access token")
    }
}

const registerUser = asyncHandler(async(req,res)=>{
    //details lena hai
    //validate karna hai ki kuch field khali to nahi hai 
    //dekhna hai ki iss data se alreaady koi user to nahi hai 
    //agar nahi hai to user.create karke kar dena hai 
    
    
    const {username , fullname , email , password}= req.body;
    if(
        [username , fullname , email , password].some((field)=>field?.trim() === "")
    )
    {
        throw new apiError(400 , "all fields are required")
    }

    const existedUser= await User.findOne({username})
    if(existedUser){
        throw new apiError(409 , "user already exist")
    }

    const user = await User.create({
        username:username.toLowerCase(),
        fullname,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    
    return res
    .status(200)
    .json(new apiResponse(200 , createdUser, "user created successfully"))

    })

const loginUser = asyncHandler(async(req,res)=>{
    const {username , password} = req.body
    if(
        [username , password].some((field)=>field?.trim() === "")
    )
    {
        throw new apiError(400 , "all fields are required")
    }
    const user = await User.findOne({username})
    if(!user){
        throw new apiError(400 , "no such user")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new apiError(400 , "Password is wrong")
    }

    const {accessToken , refreshToken} = await generateAccessAndRefreshTokens(user._id)


    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly:true,
        secure:true
    }

    res
    .status(200)
    .cookie("accessToken" , accessToken , options) 
    .cookie("refreshToken" , refreshToken , options)
    .json(
        new apiResponse(
           200,
           {
              user:loggedInUser , accessToken , refreshToken
           },
           "User Logged In Successfully"
        )
    )
})

const logoutUser = asyncHandler(async (req , res)=>{
    //main kaam hai refresh token and cookies clear karna hai db se and for that we add auth middleware
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new:true
        }
    )

    const options = {
        httpOnly:true,
        secure: true
    }

    res
    .status(200)
    .clearCookie("accessToken" , options)
    .clearCookie("refreshToken" , options)
    .json(
        new apiResponse(200 , {} ,"User logged out successfully")
    )
})

const updateUserDetails = asyncHandler(async(req , res)=>{
    const {fullname , email } = req.body

    if(!fullname && !email){
        throw new apiError(404 , "All fields are empty")
    }

    const updateFields = {};
    if (fullname) {
        updateFields.fullname = fullname;
    }
    if (email) {
        updateFields.email = email;
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: updateFields },
        { new: true }
    ).select("-password -refreshToken");

    return res
    .status(200)
    .json(
        new apiResponse(200 , user , "account details updated successfully")
    )
})

const changeCurrentPassword = asyncHandler(async(req , res)=>{
    const {oldPassword, newPassword} =req.body;
    const user = await User.findById(req.user._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if(!isPasswordCorrect){
        throw new apiError(400 , "Invalid password")
    }
    user.password = newPassword
    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(new apiResponse(200 , {} , "password updated successfully"))
})
export {
    registerUser,
    loginUser,
    logoutUser,
    updateUserDetails,
    changeCurrentPassword
}
