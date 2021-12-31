const User=require('../models/user');
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:'Sign In'
    })
}
module.exports.signUp=function(req,res){
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
    //
}