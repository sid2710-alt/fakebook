const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.create_session= async function(req,res){
  try{
let user=await User.findOne({email:req.body.email});
if(!user || user.password!=req.body.password){
   return res.json(422,{
       message:"User not found",
   }) ;
}
return res.json(200,{
message:"Sign in successful,here is your token",
date:{
    token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'1000000'})
}
})

}
  catch(e)
  {
    console.log('error',err); 
    res.status(500).json({
        message:"Internal Server Error"
    })
  }
  }