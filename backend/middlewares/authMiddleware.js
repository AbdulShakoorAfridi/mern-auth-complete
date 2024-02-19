import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { userModel } from "../models/userSchema.js";
import { decodeToken } from "../utils/generateToken.js";

const protect = asyncHandler( async (req,res,next) => {

    let token;

    token = req.cookies.token;
    if(token){
        try {
            const decoded = decodeToken(token);
            req.user =await userModel.findOne({email: decoded.payload}).select('-password');
            next();
        } catch (error) {
            res.status(401)
            throw new Error("you are unauthorized & invalid token.");
        }
    }else{
         res.status(401)
         throw new Error("you are unauthorized to access this route.");
    }


});

export {protect};

