const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const {Job}= require('../models/jobs')


router.post("/login", async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user)
		return res.status(400).send({ message: "invalid email or password!" });

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword)
		return res.status(400).send({ message: "Invalid email or password!" });

	const token = user.generateAuthToken();
	res.status(200).send({ data: token, message: "Login Successfull..." });
});


router.post("/signup", async (req, res) => {
    
	const user = await User.findOne({ email: req.body.email });
	if (user)
		return res
			.status(403)
			.send({ message: "User with given email already Exist!" });

	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);
	let newUser = await new User({
		...req.body,
		password: hashPassword,
	}).save();

	newUser.password = undefined;
	newUser.__v = undefined;
	res
		.status(200)
		.send({ data: newUser, message: "Account created successfully" });
});

router.get('/myjobs', auth, async(req,res)=>{
	const job = await Job.find({ userid: req.user._id})
	res.status(200).send({data:job});
})

module.exports = router;
