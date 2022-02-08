const express=require('express');
const router=express.Router();
const passport=require('passport');
const PostApi=require("../../../controllers/api/v1/posts_api");
router.get('/',PostApi.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),PostApi.destroy);
module.exports=router;
//,passport.authenticate('jwt',{session:false})