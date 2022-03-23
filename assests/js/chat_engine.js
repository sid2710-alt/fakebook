
class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBoxId=$(`#${chatBoxId}`);
        this.userEmail=userEmail;
        
        this.socket = io.connect('http://localhost:5000');
        if(this.userEmail)
        {
            this.connectionHandler();
        }
    }
    connectionHandler(){ 
        let self=this;
        this.socket.on('connect', function(){
            console.log('Connection established using sockets...!');
            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'Codeial',
            })
            self.socket.on('user_joined',function(data){
                console.log('a user joined',data);
            })
           
        });
        $('#send-message').click(function(){
            let msg= $('#chat-message-input').val();
            //console.log(msg);
            if(msg !='')
            {
               // console.log(msg);
              self.socket.emit('send_message',{
                  message:msg,
                  user_email:self.userEmail,
                  chatroom:'Codeial',
              })
             }
        })
        self.socket.on("recieve_message" , function(data){
            console.log("a");
            console.log("Message Received",data.message);
            let newMessage = $("<li>");
            let messageType = "self-message";

            if(data.user_email != self.userEmail){
                messageType = "other-message";
            }
            newMessage.append($('<span>', {
                'html': data.message
            }));
            newMessage.append($('<sub>', {
                'html': data.user_email
            }));
            newMessage.addClass(messageType);
            $('#chat-messages-list').append(newMessage);


            // newMessage.append($("<span>" , {"html" : data.message}));
           
            //console.log(document.getElementById("chat-messages-list"));
        })
    }
}
