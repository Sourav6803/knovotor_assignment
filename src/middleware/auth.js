const jwt=require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const User  = require('../model/user')

//.........................MIDDLEWARE-FOR AUTHENTICATION..........................................................

const authMiddleware = asyncHandler(async(req,res,next)=>{
    let token
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token = req?.headers?.authorization?.split(" ")[1]
        try{
            if(token){
                const decode = jwt.verify(token , process.env.JWT_SECRET)
                const user = await User.findById(decode?.id)
                req.user = user;
                next()
            }
        }catch(err){
            res.status(401).send({msg: "Not authorised , Please Login Again"})
        }
    } else{
        res.status(400).send({msg: "There is no token attached to the header"})
    }
})

const isAdmin = asyncHandler(async(req,res,next)=>{
        const {email} = req.user
        
        const isAdmin = await User.findOne({email: email})
        // console.log(isAdmin)
        if(isAdmin.roles !== "admin") {
            res.status(400).send({msg: 'Yor r not a admin'})
        }else{
            next()
        }
    
})


module.exports = { authMiddleware , isAdmin }

