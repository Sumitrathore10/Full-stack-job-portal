import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    applicant : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required : true
    },
    status: {
        type: String,
        enum: ["Applied", "Shortlisted", "Selected", "Rejected"],
        default: "Applied"
    },
    resume: {
        type: String,
        required: true
    },
    cover_letter: {
        type: String,
        required: true
    },
    applied_on: {
        type: Date,
        default: Date.now
    } 
},{timestamps : true})

export const Application = mongoose.model("Application",applicationSchema)