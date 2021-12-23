const express=require('express')
const router=express.Router();
const user_posts= require('../controllers/user_posts');
router.get('/posts',user_posts.posts)