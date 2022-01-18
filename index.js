const express=require('express');
const app=express();
const cookie_parser=require('cookie-parser');
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose')
const session =require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
//const { disable } = require('express/lib/application');
const MongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
app.use(sassMiddleware({
src:'./assests/scss',
dest:'./assests/css',
debug:true,
outputStyle:'expanded',
prefix:'/css'
}));
app.use(express.urlencoded({extended:true}));
app.use(cookie_parser());
app.use(expressLayouts);
app.use(express.static('./assests'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.set('view engine','ejs')
app.set('views','./views')

app.use(session({
name:'codeial',
secret:'bangbange',
saveUninitialized:false, 
resave:false,
cookie:{
    maxAge:(1000*60*1000),
},
store:MongoStore.create({
    mongoUrl: 'mongodb://localhost/fake-it',
    autoRemove:'disabled',
},
function(err)
{
    console.log(err || 'store connection ok')

}
)
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticated);
app.use('/',require('./routes/index'))

app.listen(port,function(err)
{
if(err)
console.log('Error :',err);
else 
console.log(`Server is running on port:${port}`);
});