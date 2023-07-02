const mongoose= require("mongoose");

const jobSchema= new mongoose.Schema({
    "company": { type: String, required: true },
    "title": { type: String, required: true },
    "description": { type: String, required: true },
    "location": { type: String, required: true },
    "skills": { type: [String], required: true },
    "type": { type: String, required: true },
    "userid": {type: String, required: true}
})

const Job= mongoose.model("job", jobSchema);
module.exports= {Job};
 