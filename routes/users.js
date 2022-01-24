const express=require('express')
const router=express.Router();
const passport= require('passport');
const userController=require('../controllers/user_controller')
const user_posts=require('../controllers/user_posts')
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.get('/posts',user_posts.posts)
router.get('/signUp',userController.signUp);
router.get('/signIn',userController.signIn);
router.post('/create',userController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/signIn'}
),userController.create_session);
router.get('/signOut',userController.destroy_session);
module.exports=router;