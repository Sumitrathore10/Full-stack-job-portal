import  mongoose  from "mongoose";

const jobSchema = new mongoose.Schema({
    title : {
        type:String,
        required:true,
        trim:true
    },
    description : {
        type:String,
        required:true,
        trim:true
    },
    requirement : {
        type:String,
        required:true,
        trim:true
    },
    salary : {
        type:Number,
        required:true
    },
    location : {
        type:String,
        required:true,
        trim:true
    },
    jobType : {
        type:String,
        required:true,
        trim:true
    },
    jobOpening : {
        type:Date,
        required:true
    },
    company : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required:true
    },
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    application  : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application"
    }]
},{timestamps : true})

export const Job = mongoose.mpodel("Job",jobSchema)