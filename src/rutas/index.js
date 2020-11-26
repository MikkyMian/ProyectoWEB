const expression=require('express');
const router=expression.Router();
const musuario=require('../modelos/usuarios');
const mventa=require('../modelos/venta');
var multer  = require('multer');
const path = require('path');
var storage = multer.diskStorage({
    destination: 'src/public/uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
  })
   
  var upload = multer({ storage: storage })
//var upload = multer({ dest: 'uploads/' })
function estalogeado (req,res, next) {
    //console.log(req.user);
    if (req.user){
     next();
    }else{
        res.redirect('/');
    }
}
router.get('/', (req,res)=>{
    res.render('index.ejs')
    
});

router.get('/index.ejs', (req,res)=>{
    res.render('index.ejs')
    
});

router.get('/login', (req,res)=>{
    res.render('login');
});

router.get('/administrador', (req,res)=>{
    mventa.listar_venta()
    .then(datos=>{
        res.render('administrador',{datos});
    });
    
    
});
router.get('/anuncio.ejs', (req,res)=>{
    res.render('anuncio.ejs')
    
});
router.get('/anuncios.ejs', (req,res)=>{
    res.render('anuncios.ejs')
    
});
router.get('/contacto.ejs', (req,res)=>{
    res.render('contacto.ejs')
    
});
router.get('/PROYECTOWEB', (req, res)=>{
    res.send('esta es el proyecto de web router')
});


router.post('/registrarPropietario',estalogeado,(req,res)=>{
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const dir = req.body.dir;
    const telf = req.body.telf;
    const precio = req.body.precio;
    const nDormitorios = req.body.nDormitorios;
    const nBanos = req.body.nBanos;
    const nAutos = req.body.nAutos;    
    mventa.insertar(nombre, descripcion, dir, telf, precio, nDormitorios, nBanos, nAutos)
        .then(datos=>{
            res.redirect('/administrador');
        });
})
module.exports = router;  