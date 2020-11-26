const express=require('express');
const router=express.Router();
const musuario=require('../modelos/usuarios');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const session = require('express-session');

passport.serializeUser (function (user, done){
    done(null,user);
});

passport.deserializeUser (function (user, done){
    done(null,user);
});
passport.use(new LocalStrategy(
    (username, password, done)=> {
        console.log("dasdas");
        musuario.verificar(username,password)
            .then( usuario => {
                console.log(usuario);
                if(usuario) {
                    session.usuario=usuario;
                    done(null,usuario);
                }
                else
                    done(null,false);
            })
    }
))
router.get('/',(req,res)=>{
    res.render('index');
});
router.post('/login',
    passport.authenticate('local',{failureRedirect:'/',failureMessage:true}),
    function(req,res){
        console.log("sadasd");
        res.redirect('/administrador');
        //res.render('administrador');
    }
);

module.exports=router;