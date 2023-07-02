const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

module.exports = async(req, res, next) => {
	try{ 
        const header = req.headers.authorization;
        if(!header) return res.status(500).send({status: 'error', message:'Login required.'})
        const token= header.split(' ')[1]
        const userVer= jwt.verify(token, process.env.JWTPRIVATEKEY)
        
        req.user= await User.findById(userVer._id)
        next();
    } catch(err){
        console.log(err) 
        if(err.name=="JsonWebTokenError"){
           return res.json({status:'error', message:'Login to Upload Credentials'});
        }
        throw err
    } 
};