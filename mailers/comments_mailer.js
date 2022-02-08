//const nodemailer = require('../config/nodemailer');
const nodeMailer=require('../config/nodemailer');
exports.newComment=(comment)=>{
   // console.log('form newcomment mail');
let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
console.log(htmlString);
    nodeMailer.transporter.sendMail({
        from:'chauhansiddhantkakadeo@gmail.com',
        to :comment.user.email,
        subject:"New Comment Published",
        html:htmlString

    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Message Sent',info);
        return;
    });
}