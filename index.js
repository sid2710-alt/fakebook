const express = require('express');
const path =require('path');
const env=require('./config/environment');
const logger=require('morgan');
const app = express();
const cookie_parser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')
const session = require('express-session');
const passport = require('passport');
var cors=require('cors');
const passportLocal = require('./config/passport-local-strategy');
const passportjwt=require('./config/passport-jwt-strategy');
//const { disable } = require('express/lib/application');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware=require('./config/middleware');
const chatServer=require('http').createServer(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000, function (error) {
    if (error) {
      console.log("Error in setting up Chat Server");
    } else {
      console.log("Chat Server is listening on port 5000");
    }
  });
const passportGoogle=require('./config/passport-google-oauth2-strategy')
if(env.name=="development")
{
    app.use(sassMiddleware({

        src:path.join(__dirname,env.asset_path,'/scss'),
        dest:path.join(__dirname,env.asset_path,'/css'),
        debug: true,
        outputStyle: 'expanded',
        prefix: '/css'
    }));
}

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());
app.use(expressLayouts);
app.use(express.static(env.asset_path));
app.use('/uploads',express.static(__dirname +'/uploads'));
app.use(logger(env.morgan.mode,env.morgan.options));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs')
app.set('views', './views'),

app.use(session({
    name: 'codeial',
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 1000),
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/fake-it',
        autoRemove: 'disabled',
    },
        function (err) {
            console.log(err || 'store connection ok')

        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticated);
app.use(flash());
app.use(customMware.setflash);
app.use('/', require('./routes/index'))

app.listen(port, function (err) {
    if (err)
        console.log('Error :', err);
    else
        console.log(`Server is running on port:${port}`);
});