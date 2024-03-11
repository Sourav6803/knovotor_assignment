const passport = require('passport') 
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require('../model/user')

passport.use(new GoogleStrategy(
    {
    clientID: "540085922879-1u10g933tu34d2jqkugji52t3m4fahqh.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL:"/auth/google/callback",
    scope: ["profile","email"]
    },
    async function(accesstoken,refreshToken , profile , cb){
        
        let data = profile?._json
        const user = await User.findOne({email: data.email})
        
        if(user){
            return await cb(null , user)
        }else{
            const newUser = await User.create({
                firstname : data.name,
                lastname: data.given_name,
                email: data.email,
                roles: "user"
            })
            return await cb(null , newUser)
        }
    }
    
))

passport.serializeUser((user,done)=>{
    done(null , user)
})
passport.deserializeUser((user,done)=>{
    done(null , user)
})