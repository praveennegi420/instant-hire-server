const mongoose = require("mongoose");

const applicantSchema= new mongoose.Schema({
    name: { type: String, required: true },
	email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    experience: { type: String, required: true },
    education: { type: String, required: true },
    cgpa: { type: String, required: true },
    salaryexpect: { type: String, required: true },
    jobid: { type: String, required: true },
    skills: { type: [String], required: true },
}) 

const Applicant= mongoose.model("applicant", applicantSchema);
module.exports= {Applicant};