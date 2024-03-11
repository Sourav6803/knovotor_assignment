const express = require('express');
const router = express.Router();

const { authMiddleware, isAdmin } = require('../middleware/auth');

const {registerAUser , loginUser   } = require('../controller/user');
const { createPost, getPostById, updateAPost, deleteAPost, findPost, getAllPost } = require('../controller/post');



router.post("/register", registerAUser)
router.post("/login", loginUser)

router.post("/post",authMiddleware, createPost)
router.get("/getPostById/:id",authMiddleware, getPostById)
router.put("/updatePostById/:id",authMiddleware, updateAPost)
router.delete("/deletePost/:id",authMiddleware, deleteAPost)

router.post("/findStore",authMiddleware, findPost)  //find store by their geo metric location
router.get("/allPost",authMiddleware, getAllPost)  //get post whcih are actuive true


module.exports = router