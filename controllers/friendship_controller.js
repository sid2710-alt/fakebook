const User=require('../models/user');
const Friendship=require('../models/friendship');
module.exports.make_friend= async function(req,res)
{
    
  let existingFriendship = await Friendship.findOne({
    from_user : req.user,
    to_user : req.query.id,
});

let toUser = await User.findById(req.user);
let fromUser = await User.findById(req.query.id);

let deleted = false;

if(existingFriendship){
    toUser.friendships.pull(existingFriendship._id);
    fromUser.friendships.pull(existingFriendship._id);
    toUser.save();
    fromUser.save();
    existingFriendship.remove();
    deleted = true;
    removeFriend = true;
}else{
    let friendship = await Friendship.create({
        to_user : req.query.id,
        from_user : req.user._id
    });

    toUser.friendships.push(friendship);
    fromUser.friendships.push(friendship);
    toUser.save();
    fromUser.save();
}

if(req.xhr){
    return res.status(200).json({
        deleted : deleted , 
        message : "Request Successful",
    });
}


//console.log(populated_user);
 return res.redirect("back");
}