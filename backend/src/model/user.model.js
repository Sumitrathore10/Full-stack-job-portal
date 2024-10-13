import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true
    },
    phoneno:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password is required !!!"],
        minlength:8,
        trim:true,
        index:true
    },

    watchhistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Vedio"
        }
    ],
    refreshtoken:{
        type:String
    },
    role:{
        type:String,
        enum:["student","recruiter"]
    },
    profile:{
        bio:{
            type:String
        },
        skills:[{
            type:String
        }
        ],
        resume:{
            type:String  //cloudnary url
        },
        resumeOriginalName:{
            type:String
        },
        profilePhoto:{
            type:String, //cloudnary url
            default:""  
        },
        company:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Company"
        }
    }
    
    
},{timestamps:true})

export const User = mongoose.model("USer",userSchema)