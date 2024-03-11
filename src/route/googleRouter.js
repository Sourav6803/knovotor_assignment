const googleRouter = require("express").Router()
const passport = require("passport")
const { generateToken } = require('../utils/jwtToken')
const User = require('../model/user')
const asyncHandler = require('express-async-handler')

googleRouter.get("/login/success", asyncHandler(async(req,res)=>{
    
    if(req.user){
        
        const findUser = await User.findOne({email: req.user.email})
        
        
        if(findUser){
            res.status(200).send({status: true, 
                msg: "Login Succesfully", 
                token: generateToken(findUser._id), 
                roles:findUser?.roles, 
                username: findUser?.firstName +" " + findUser?.lastName , 
                user_image: findUser?.user_image,
                from: "google" 
            })
        }
    }else{
        return res.status(500).send({msg: "Something went wrong"})
    }
}))

googleRouter.get("/login/failed", asyncHandler(async(req,res)=>{
    console.log("login failed")
    res.status(401).send({status: false , msg: "Login Failed"})
}))

googleRouter.get("/google", 
    passport.authenticate("google",["profile","email"])
)

googleRouter.get("/auth/google/callback",  passport.authenticate("google",{
        successRedirect: "/login/success",
        failureRedirect: "/login/failed"
    })
)

googleRouter.get("/logout", asyncHandler(async(req,res)=>{
    req.logout();
    res.redirect("/")
}))

module.exports = googleRouter
