//const nodemailer = require('../config/nodemailer');
const nodeMailer=require('../config/nodemailer');
exports.resetPassword=(token)=>{
   // console.log('form newcomment mail');
   //let link=`http://localhost:8000/users/reset-profile/:${token}`;

//console.log('******',htmlString);
//console.log('######',token.email);
     let tid=token._id;
    nodeMailer.transporter.sendMail({
        from:'chauhansiddhantkakadeo@gmail.com',
        to :token.user.email,
        subject:"New Comment Published",
        html:'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://localhost:8000/users/reset-profile/'+tid + 
        ' If you did not request this, please ignore this email and your password will remain unchanged.\n'

    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Message Sent',info);
        return;
    });
}