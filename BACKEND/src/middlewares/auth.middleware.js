import { asyncHandler } from "../utils/assynHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/users.models.js";
import { apiError } from "../utils/apiError.js";




export const verifyJWT = asyncHandler(async(req ,res ,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer " , "")
        if(!token){
            throw new apiError(400 , "Unauthorized request hai")
        }

        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if(!user){
            throw new apiError(401 , "invalid access token")
        }

        req.user = user
        next()

    } catch (error) {
        throw new apiError(400 , error?.message || "Invalid access token")
    }
})