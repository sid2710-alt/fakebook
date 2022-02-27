const User=require('../models/user');
const fs=require('fs');
const path=require('path');
const crypto=require('crypto');
const Token=require('../models/token');
const reset_mailer=require('../mailers/password_mailer');
const mongoose=require('mongoose')

module.exports.profile =async function(req, res){
    let populated_user = await User.findById(req.user).populate('friendships'); 
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user,
            populated_user,
            }
        )

    })
    
}
module.exports.signIn=function(req,res){
    if(req.isAuthenticated())
    {
      return  res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:'Sign In'
    })
}
module.exports.update= async function(req,res){
    // if(req.params.id==req.user.id)
    // {
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         return res.redirect('back');
    //     })
    // }
    // else
    // {
    //     return res.status(401).send('Unauthorized');
    // }
    if(req.params.id==req.user.id)
{
    try
    {
        let user=await User.findById(req.params.id);
        User.uploadedAvatar(req,res,function(err){
            if(err)
            {
                console.log('multer error',err);
                
            }
            //console.log(req.file);
            user.name=req.body.name;
            user.email=req.body.email;
            if(req.file)
            {
                
                if(user.avatar)
                {
                   fs.exists(path.join(__dirname,'..',user.avatar), function (isExist) {
                        if (isExist) {
                          fs.unlinkSync(path.join(__dirname + '..'+user.avatar));
                        } else {
                         // console.log("DOES NOT exist:", path);
                        }
                      });

                }
                user.avatar=User.avatarPath +'/' +req.file.filename;
            }
            user.save();
            return res.redirect('back');

        });
    }
    catch(err){
req.flash('error',err);
res.redirect('back');
    }

}

}
module.exports.signUp=function(req,res){
    if(req.isAuthenticated())
    {
      return  res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:'Sign Up'
    })
}
//get the signUp data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password)
    return res.redirect('back'); 

    User.findOne({email:req.body.email},function(err,user){
        if(err){
         console.log('Error in finding uses in signing up');
         return; 
        }
        if(!user)
        {
            User.create(req.body,function(err,user){
              if(err)
              {
                console.log('Error in creating user while signing Up');
                return;    
              } 
              return res.redirect('/users/signIn');    
            })
        }
        else
        {
            return res.redirect('back');
        }
        
})

    
}
module.exports.create_session=function(req,res){
  req.flash('success','Logged in Successfully')  
return res.redirect('/')
}
module.exports.destroy_session=function(req,res){
    req.logout();
    req.flash('success','Logged out Successfully') 
    return res.redirect('/');
}
module.exports.reset=function(req,res){
    return res.render('forget-password',{
        title:'Change Password',
    })
}
module.exports.changepass=async function(req,res){
 let user=await User.findOne({email:req.body.email});
 //console.log(user);
 let token=await Token.create({
       code:crypto.randomBytes(20).toString('hex'),
       user:user,
       isValid:true
    })
    //console.log(token);
    //console.log('&&&&&&&&',token.user.email);
reset_mailer.resetPassword(token);
return res.redirect('/');
    
} 
module.exports.changeprofile= async function(req,res){
    //var id =await mongoose. Types. ObjectId(req.params.id);
    console.log(req.params.tid)
    let token=await Token.findById(req.params.tid);
    console.log('*****',token)
    if(!token.isValid)
    {
        return res.redirect('/');
    }
    token.isValid=false;
    token.save();
return res.render('changeprofile',{
    user:token.user,
    title:'change here'
})
}
module.exports.setpassword=async function(req,res){
let user= await User.findById(req.body.user);
user.password=req.body.password;
await user.save();
return res.redirect('/');
}