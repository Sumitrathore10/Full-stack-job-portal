import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    location: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    revenue: {
        type: Number,
        required: true
    },
    employees: {
        type: Number,
        required: true
    },
    founded_year: {
        type: Number,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    hiring_status: {
        type: String,
        required: true
    },
    job_openings: {
        type: Number,
        required:true
    }
},{timestamps : true})

export default mongoose.model("Company", companySchema);