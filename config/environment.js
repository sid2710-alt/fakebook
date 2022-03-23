<<<<<<< HEAD
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory)|| fs.mkdirSync(logDirectory);
const accesslogStreams = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory,
    //size:"200M"
});
//const logDirectory = path.join(__dirname, '../production_logs');
// fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);  // Create if not exists

// const accessLogStream = rfs.createStream('access.log', {
//     interval: '1d',
//     path: logDirectory
// });

const development = {
    name: "development",
    asset_path: './assests',
    session_cookie_key: 'bangbange',
    db: 'fakeit_development',
    smtp: {
=======
const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory)|| fs.mkdirSync(logDirectory);
const accesslogStreams = rfs.createStream("access.log",{
    interval:'1d',
    //path:logDirectory,
    size:"200M"
})

const development={
    name:"development",
    asset_path:'./assests',
    session_cookie_key:'bangbange',
    db:'fakeit_development',
    smtp:{
>>>>>>> 01a92b9c78defd2dda58be32d1854972002434ee
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'siddhantchauhan333',
            pass: 'MaiHunDon'
        }
    },
<<<<<<< HEAD
    clientID: "892631701769-a5d5vpol9997b6f1ti1tvjd3pq158bu5.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwt_key: 'codeial',
    morgan: {
        mode: 'dev',
        options: { stream: accesslogStreams }
    },
//     morgan: {
//         mode: 'dev',
//         options: { stream: accessLogStream }
//     }
}
const production = {
    name: "production",
    asset_path: eval(process.env.fake_it_assestspath),
    session_cookie_key: eval(process.env.fake_it_session_cookie_key), //'bangbange',
    db: eval(process.env.fake_it_db),//'fakeit_production',
    smtp: {
=======
    clientID:"892631701769-a5d5vpol9997b6f1ti1tvjd3pq158bu5.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback",
    jwt_key:'codeial',
    morgan:{
mode:'dev',
options:{
    streams:accesslogStreams
}
    }
}
const production={
    name:"production",
    asset_path:eval(process.env.fake_it_assestspath),
    session_cookie_key:eval(process.env.fake_it_session_cookie_key), //'bangbange',
    db: eval(process.env.fake_it_db),//'fakeit_production',
    smtp:{
>>>>>>> 01a92b9c78defd2dda58be32d1854972002434ee
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: eval(process.env.fake_it_gmailuser),//'siddhantchauhan333',
            pass: eval(process.env.fake_it_gmailpass),//'MaiHunDon'
        }
    },
<<<<<<< HEAD
    clientID: eval(process.env.fake_it_googleclientID),//"892631701769-a5d5vpol9997b6f1ti1tvjd3pq158bu5.apps.googleusercontent.com",
    clientSecret: eval(process.env.fake_it_clientSecret),//"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",
    callbackURL: eval(process.env.fake_it_googlecallbackURL),//"http://fakeit.com/users/auth/google/callback",
    jwt_key: eval(process.env.fake_it_jwt_key),//'codeial'
    morgan: {
        mode: 'combined',
        options: {
            stream: accesslogStreams
        }
    }
}
module.exports = development;
//module.exports=eval(process.env.fakeit_environment)==undefined?development:eval(process.env.fakeit_environment);  
=======
    clientID:eval(process.env.fake_it_googleclientID),//"892631701769-a5d5vpol9997b6f1ti1tvjd3pq158bu5.apps.googleusercontent.com",
    clientSecret:eval(process.env.fake_it_clientSecret),//"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",
    callbackURL: eval(process.env.fake_it_googlecallbackURL),//"http://fakeit.com/users/auth/google/callback",
    jwt_key:eval(process.env.fake_it_jwt_key),//'codeial'
    morgan:{
        mode:'combined',
        options:{
            streams:accesslogStreams
        }
            }
}
module.exports=eval(process.env.fakeit_environment)==undefined?development:eval(process.env.fakeit_environment);  
>>>>>>> 01a92b9c78defd2dda58be32d1854972002434ee
