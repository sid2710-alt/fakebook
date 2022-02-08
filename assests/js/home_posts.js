
{
     //method to submit the form data using ajax
     let createPost=function(){
         let newPostForm= $('#new-post-form');
         newPostForm.submit(function(e){
             e.preventDefault();
             $.ajax({
                 type:'post',
                 url:"/posts/create",
                 data:newPostForm.serialize(),
                 success:function(data)
                 {
                     let newPost=newPostDom(data.data.post);
                     $('#posts_list_container>ul').prepend(newPost);
                     //req.flash('success', 'Post published!');
                     deletePost($(' .delete-post-button',newPost ));
                     new PostComments(data.data.post._id);
                     new ToggleLike($(' .toggle-like-button',newPost));
                     new Noty({
                      theme: 'relax',
                      text: "Post Added",
                      type: 'success',
                      layout: 'topRight',
                      timeout: 1500,
                      
                  }).show();
                 }, 
                 error:function(error)
                 {
                     console.log(error.responseText);

                 }
             })

         });
         
     }
     // method to create a post in dom
     let newPostDom =function(post) {
         return $(`<li id="post-${post._id}">
         <p>
           
           <small>
             <a class="delete-post-button" href="posts/destroy/${post._id}">X</a>
           </small>
           
           ${post.content} 
           <br>
           <small>
           ${post.user.name}
        </small>
        <br>
        <small>
        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
        0 Likes</a>
        </small>
     
         </p>
          <div class="post-comments">
          
             <form action="/comments/create" method="POST">
               <input type="text" name="content" placeholder="Type here to add comment..">
               <input type="hidden" name="post" value="${post._id}">
               <input type="submit" value="Add Comment">
             </form>
            
             <div class="post-comments-list">
               <ul id="post-comment-${post._id}">
                
     
               </ul>
             </div>
          </div>
          
       </li>`)
     }
let deletePost=function(deletelink)
{
  $(deletelink).click(function(e){
    e.preventDefault();
    $.ajax({
      type:'get',
      url:$(deletelink).prop('href'),
      data:newPostForm.serialize(),
      success:function(data)
      {
                  $(`#posts-${data.data.post_id}`).remove();
                  new Noty({
                    theme: 'relax',
                    text: "Post Deleted",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500,
                    
                }).show();
      }, 
      error:function(error)
      {
          console.log(error.responseText);

      }
  })
  })

  
}
let convertPostsToAjax = function(){
  $('#posts-list-container>ul>li').each(function(){
      let self = $(this);
      let deleteButton = $(' .delete-post-button', self);
      deletePost(deleteButton);

      // get the post's id by splitting the id attribute
      let postId = self.prop('id').split("-")[1]
      new PostComments(postId);
  });
}



createPost();
convertPostsToAjax();
    
 }