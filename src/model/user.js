const mongoose = require("mongoose");
const crypto = require("crypto")
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
        firstName: {
            type: String,
            // required: true
        },
        lastName: {
            type: String,
            // required: true
        },
        email: {
            type: String,
            index: true
        },
        
        password: {
            type: String, 
        },
        roles: {
          type: String,
          default: "user"
      },
        
        passwordChangedAt : Date,
        passwordResetToken : String,
        passwordResetExpires: Date,
        
    }, { timestamps: true })

    userSchema.pre("save", async function(next){
        if(!this.isModified("password")){
            next()
        }
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    })

    userSchema.methods.isPasswordMatched = async function(enterPassword){
        return await bcrypt.compare(enterPassword , this.password)
    }

    userSchema.methods.createPasswordResetToken = async ()=>{
        const resetToken = crypto.randomBytes(32).toString("hex")
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        console.log("resetToken" , resetToken)
        this.passwordResetExpires = Date.now() + 30*60*1000
        
        return (resetToken)
        
    }

module.exports = mongoose.model('User', userSchema)