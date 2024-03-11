const express = require('express')
const mongoose = require('mongoose')
const User = require("../model/user")
const Post = require("../model/post")
const asyncHandler = require('express-async-handler')


const createPost = asyncHandler(async(req,res)=>{
    try{
        const userId = req.body.createdBy
        const userdata = await User.findOne({_id: userId})
        
        if(userdata){
            
                const existPost = await Post.findOne({createdBy : userId})
                if(existPost){
                    res.status(200).send({success: false, message: "This user already created post"})
                }
                else{
                    const post = new Post({
                        title: req.body.title,
                        body: req.body.body,
                        createdBy: req.body.createdBy,
                        location: {
                            type: 'Point',
                            coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)]
                        }
                    }) 

                    const postData = await post.save()
                    res.status(200).send({success:true, message: "Post Data", data: postData})
                }
            
        }
    }
    catch(err){
        return res.status(500).send({ status: false, message: err.message })
    }
})

const getPostById = async function (req, res) {
    try {
        
         const postId= req.params.id;
         console.log(postId)
         
        if (!mongoose.isValidObjectId(postId)) return res.status(400).send({ msg: "inavalid id format" })

        //if (req.user._id != userId) return res.status(403).send({ status: false, message: "you are not authorized" })

        const post = await Post.findById({_id: req.params.id})
        console.log(post)

        return res.status(200).send({ status: true, message: "post fetch success", data: post });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

const updateAPost = asyncHandler(async(req,res)=>{
    try{
        
        const id = req.params.id
        console.log(id)
        const post = await Post.findByIdAndUpdate(id , req.body , {new:true})
        res.status(200).send({status:true, msg: " Post updated succesfully" , post})
        
    }
    catch(err){
        return res.status(500).send({ status: false, message: err.message }) 
    }
})

const deleteAPost = asyncHandler(async(req,res)=>{
    try{
        const {id} = req.params
        const post = await Post.findByIdAndDelete(id)
        res.status(200).send({status:true, msg: " Post deleted succesfully"})
        
    }
    catch(err){
        return res.status(500).send({ status: false, message: err.message }) 
    }
})



module.exports = {createPost, getPostById, updateAPost,deleteAPost }