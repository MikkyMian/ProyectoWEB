const express=require('express');
const path=require('path');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const session = require('express-session');
const passport = require('passport');
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized :false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended:false}));
app.set(bodyParser.json());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'vistas'));
app.use(express.static(path.join(__dirname,'publico')));
app.use(require('./rutas/login'));
app.use(require('./rutas/index'));
app.use(morgan('dev'));
app.listen(3000,()=>{
    console.log('servidor corriendo');
});
