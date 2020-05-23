const router=require('express').Router();
const User = require('../model/User');

// VALIDATION
const JOI=require('@hapi/joi');
const Joi = require('@hapi/joi');

const Schema={
    name:Joi.String().min(6).requred(),
    email:Joi.String().min(6).requred().email(),
    password:Joi.string().min(6).requred()
}


router.post('/register',async(req,res)=>{

// Lets Validate the data before we a user

const {error} =Joi.Validate(req.body,Schema);

if(error)
return res.status(400).send(error.details[0].message);


const user=new User({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
});
try{
   const saveUser=await user.save();
   res.send(saveUser)
}catch(err)
{
    res.status(400).send(err);
}
});


module.exports=router;