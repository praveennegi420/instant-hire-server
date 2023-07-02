const router = require("express").Router();
const {Applicant}= require('../models/applicant')
const {Job}= require('../models/jobs')
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const { route } = require("./auth");


// POST JOB BY HR
router.post("/post", auth, async(req,res)=>{
	let job= await new Job({...req.body, userid: req.user._id}).save();
	res.status(200).send({message: "Job Posted."})
})

// APPLY BY APPLICANTS
router.post("/apply", async(req, res)=>{
    const user = await Applicant.findOne({ email: req.body.email });
	if (user)
		return res
			.status(403)
			.send({ message: "Already Applied." });
    let applicant= await new Applicant({...req.body}).save();
    res.status(200).send({message: "Successfully Applied."})
})

// GET APPLICANTS BY JOB ID ( HR CAN CHECK )
router.get("/applicants/:id", auth,  async (req, res) => {
	const jobid= req.params.id; console.log(jobid)
	const users = await Applicant.find({jobid:jobid});
	res.status(200).send({ data: users });
});

router.post("/applicants/:id", auth,  async (req, res) => {
	const jobid= req.params.id; console.log(jobid)
	const {price, cgpa, exp} = req.params; 
	const users = await Applicant.find({jobid:jobid});
	let newUsers  = users;
	newUsers = newUsers.filter(user => user.cgpa > cgpa) ;
	newUsers = newUsers.filter(user=> user.experience > exp); 
	newUsers = newUsers.filter(user=>user.salaryexpect > price); 
	res.status(200).send({ data: newUsers });
});

// GET ALL JOBS 
router.get('/', async(req,res)=>{
	const jobs= await Job.find({}); 
	res.status(200).send({data: jobs});
}) 


module.exports = router;