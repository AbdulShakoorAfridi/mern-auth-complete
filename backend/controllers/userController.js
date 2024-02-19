import asyncHandler from "express-async-handler"
import { userModel } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import { decodeToken, generateToken } from "../utils/generateToken.js";

// @desc Auth user / set token;
// route  Post  api/user/auth;
// @access public
const loginUser = asyncHandler(async (req, res) => {
        // res.status(404);
        // throw new Error("Not Found");
        const {email, password} = req.body;
        // console.log(email, password);
        if(!email ||!password){
            res.status(404)
            throw new Error("All fields are required");
        };
        const user = await userModel.findOne({email});
        if (!user) {
            res.status(400)
            throw new Error("user not found");
        };
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            res.status(400)
            throw new Error("password is incorrect");
        };
        const payload =  user.email;
        const token = generateToken({payload});

        res.cookie("token", token).status(200).json({
            status:"success",
            message : "user logged in successfully.",
            data: user
        })
  
});


// @desc Auth user / set token
// route Post api/user/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    // console.log(name, email, password);
    if(!name || !email || !password){
            res.status(404)
            throw new Error("All fields are required");
    };

    const userExist = await userModel.findOne({email});
    if (userExist) {
        res.status(400)
        throw new Error("user already exists");
    };
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await userModel.create({name, email, password: hashedPassword});
    if(user){
       res.status(201).json({message : "user created successfully", data: user.name});
    }else{
        res.status(400)
        throw new Error("user could not be created! Please try again");
    }
});

// @desc  logout user
// route  Post / api /users /logout
// @access public
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token").status(200).json({message : "user logged out"});
});



// @desc   User Profile
// route   Get / api /users /Profile
// @access Private
const userProfile = asyncHandler(async (req, res) => {
    // console.log(req.user);
    if(!req.user){
        res.status(401)
        throw new Error("you are not authorized to access this route.");
    }
    const {_id, name, email} = req.user;
    res.status(200).json({
        _id,
        name,
        email
    })
});



// @desc   Update User Profile
// route   patch / api /users / updateProfile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user._id);
    if(!user){
        res.status(401)
        throw new Error("you are not authorized to access this route.");
    }else{
        const {name, email} = req.body;
        user.name = name || user.name;
        user.email = email || user.email;
        if(req.body.password){
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            user.password = hashedPassword;
        }
        const updatedUser = await user.save();
        res.status(200).json(
            {
                status : "success",
                data : "updated user profile" + updatedUser,
            }
            )
    }
});

export { 
    loginUser,
    registerUser,
    logoutUser,
    userProfile,
    updateUserProfile
}