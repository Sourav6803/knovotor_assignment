const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title:{
      type: String,
      required: [true, "Please enter your Post title!"],
    },
    body:{
      type: String,
      required: [true, "Please enter your Post Body!"],
    },
   
    createdBy:{
        type: String,
        required: true,
    },
    
    active : {
        type: Boolean,
        default: true
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: {
            type: Array,
            default: [-1,1]
        }
        
    }
   
   
  },{timestamps:true} );

  postSchema.index({location: "2dsphere"})

  module.exports = mongoose.model("Post", postSchema);