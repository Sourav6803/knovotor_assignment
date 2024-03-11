const express = require('express')
const User = require("../model/user")
const router = express.Router()
const ErrorHandler = require('../utils/ErrorHandler')
const jwt = require("jsonwebtoken")
const catchAsyncError = require("../middleware/catchAsyncErrors")
const sendToken = require("../utils/jwtToken")
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const { isAuthenticated } = require('../middleware/auth')
const asyncHandler = require('express-async-handler')
const { generateToken } = require('../utils/jwtToken')

 const registerAUser = asyncHandler(async(req,res)=>{
  try{
      const email = req.body.email
      const findUser = await User.findOne({email:email})
      if(findUser) return res.status(200).send({ status: false, message: "User Already exist" })
      if(!findUser){
          const createUser = await User.create(req.body)
          res.status(201).send({status:true, msg: "User Created Successfully", createUser})
      }
  }
  catch(err){
      return res.status(500).send({ status: false, message: err.message })
  }
})


 const loginUser = asyncHandler(async(req,res)=>{
  try{
      let { email, password } = req.body;
      let findUser = await User.findOne({ email: email });
      if (!findUser) return res.status(400).send({ status: false, message: "emailId is not present in db" });
      if(findUser && (await findUser.isPasswordMatched(password))){
          res.status(200).send({status: true, msg: "Login Succesfully", token: generateToken(findUser._id), roles:findUser?.roles, username: findUser?.firstName +" " + findUser?.lastName, id: findUser.id })
      }else{
          throw new Error ("Invalid Credentials")
      }
  }
  catch(err){
      return res.status(500).send({ status: false, message: err.message }) 
  }
})


module.exports = {registerAUser, loginUser}