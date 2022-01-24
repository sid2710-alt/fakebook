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
                     deletePost($(' .delete-post-button',newPost ))
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
      }, 
      error:function(error)
      {
          console.log(error.responseText);

      }
  })
  })

  
}
     createPost();
 }