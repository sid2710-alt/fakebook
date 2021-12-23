const express=require('express')
const router=express.Router();
const userController=require('../controllers/user_controller')
const user_posts=require('../controllers/user_posts')
router.get('/profile',userController.profile);
router.get('/posts',user_posts.posts)
module.exports=router;