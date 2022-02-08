const Post=require('../../../models/post');
const Comment=require('../../../models/comments');
module.exports.index= async function(req,res){
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user').populate({
        path: 'comments', populate: {
            path: 'user',
        }
    });
    return res.status(200).json(posts);
        // message:"List of Posts",
        // posts:posts,
//     })
 }
 module.exports.destroy= async function(req,res)
{
   // console.log("idddd",req.user.id);
    try{
       // console.log("%%%%%%%%%%%%%%",req.params.id.length);
        let arr= req.params.id;
       // console.log("^&&**&&^&^&^&",arr);
        let post=await Post.findById(arr);
       // console.log("***POST",post);
        if(post.user==req.user.id)
         {

             post.remove();
            // console.log("TILLL HERE");
            await Comment.deleteMany({post:arr})
            // if(req.xhr)
            // {
            //     return res.status(200).json({
            //         data:{
            //             post_id:req.params.id,
            //         },message:'Post deleted',
            //     })
            // }
            // req.flash('success', 'Post and associated comments deleted!');
            return res.status(200).json({
                message:"'Post and associated comments deleted!'",
            })
          }
          else
          {
           return res.json(401,{
               message:"you cannot delete this post",
           })
          }
    }
    catch(err)
    {
    //     req.flash('error', e);
      console.log('error',err); 
    res.status(501).json({
        message:"Internal Server Error"
    });
    }
    
        
    }