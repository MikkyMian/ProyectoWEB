const conexion=require('../database');
module.exports={
    verificar(usuario,clave){
        return new Promise((resolve,reject) =>{
            conexion.query('select * from usuario WHERE cuenta=? AND contrasenia=?',[usuario,clave],(err,usuario)=>{
                if (err) reject(err)
                else if (usuario.length>=1) resolve(usuario[0]);
                else  resolve(false);
            });
        } )
    },
    insertar(nombre, descripcion, dir, telf, precio, nDormitorios, nBanos, nAutos){
        return new Promise((resolve,reject) =>{
            conexion.query('INSERT INTO venta SET nombre_propietario=?, direccion=?, telefono=?, precio=?, N_dormitorios=?, N_banios=?, N_autos=?',[nombre, descripcion, dir, telf, precio, nDormitorios, nBanos, nAutos],(err,venta)=>{
                if (err) reject(err)
                //else if (usuario.length>=1) resolve(usuario[0]);
                else  resolve("si");
            });
        } )
    },

}