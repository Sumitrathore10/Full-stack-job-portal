import asyncHandler from "../utils/asynchandler.js";
import { apiError } from "../utils/apierror.js";
import { apiResponse } from "../utils/apiResponse.js";
import { User } from "../model/user.model.js";
import fileUploadOnCloudinary from "../utils/cludinary.js";

const registerUser = asyncHandler(async (req,res)=>{
    
    const {username,email,fullname,password} = req.body

    // fields validation
    
    if([username,email,fullname,password].some((fields)=>{
        return fields?.trim() === ""
    })){
        throw new apiError(400,"All fields are required !!!")
    }

    // email validation

    if(!email  || !email?.trim().endsWith('@gamil.com')){
        throw new apiError(400,"Invalid email address")
    }

    // check user existance

    const userexistance = User.findOne({
        $or:[{email},{username}]
    })
     
    if(userexistance){
        throw new apiError(409,"User is already exist !!!")
    }

    // add file and image locally 

    const profilelocalpath = req.file?.profilePhoto[0]?.path;
    const resumelocalpath = req.file?.resume[0]?.path;

    if(!profilelocalpath){
        throw new apiError(400,"Profile photo is required")
    }
    if(!resumelocalpath){
        throw new apiError(400,"Resume is required")
    }

    const profilePhoto = await fileUploadOnCloudinary(profilelocalpath)
    const resume = await fileUploadOnCloudinary(resumelocalpath)
    
    if(!profilePhoto){
        throw new apiError(500,"Failed to upload profile photo")
    }
    if(!resume){
        throw new apiError(500,"Failed to upload resume")
    }

    // db entry

    const user = await User.create({
        username : username.toLowerCase(),
        email : email.toLowerCase(),
        fullname,
        password,
        profilePhoto : profilePhoto.url,
        resume : resume.url
    })

    // remove password and refresh token

    const createduser = await User.findById(user._id).select(
        "-password -refreshtoken"
    )


    // check user creation

    if(!createduser){
        throw new apiError(500,"Something went wrong while registering the user")
    }

    // return res

    return res.status(201).json(
        new apiResponse(200,createduser,"User registered successfully !!!")
    )
});

export default registerUser;