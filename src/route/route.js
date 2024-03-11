const express = require('express');
const router = express.Router();

const { authMiddleware, isAdmin } = require('../middleware/auth');

const {registerAUser , loginUser   } = require('../controller/user');
const { createPost, getPostById, updateAPost, deleteAPost } = require('../controller/post');



router.post("/register", registerAUser)
router.post("/login", loginUser)

router.post("/post",authMiddleware, createPost)
router.get("/getPostById/:id",authMiddleware, getPostById)
router.put("/updatePostById/:id",authMiddleware, updateAPost)
router.delete("/deletePost/:id",authMiddleware, deleteAPost)


module.exports = router