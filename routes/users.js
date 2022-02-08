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
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/signIn'}),userController.create_session);
router.get('/forget-password',userController.reset);
router.post('/resetpass',userController.changepass);
router.get('/reset-profile/:tid',userController.changeprofile);
router.post('/resetpassword',userController.setpassword);
module.exports=router;