var express = require('express');
var sedeDAO = require('../DAO/sede');
var router = express.Router();


router.post('/sedes', async function(req, res, next) {


    var cexiste = await sedeDAO.getSedes();
    if(cexiste === " " || cexiste === null){
        return res.status(200).send({estado: 'Fallo', mensaje:'sedes incorrecto'});
    }
    //console.log(pexiste);

    return res.status(200).send({estado: 'Exito', datos: cexiste, mensaje:'sedes obtenidas'});
    // res.status(200).send('Se agrego correctamente');


});


router.post('/porId', async function(req, res, next) {
    var usuario = req.body;
    if (!usuario){
        return  res.status(200).send({estado: 'Fallo', mensaje:'Datos incorrectos'});
    }



    var cexiste = await sedeDAO.getSedePorId(usuario.id);
    if(cexiste === " " || cexiste === null){
        return res.status(200).send({estado: 'Fallo', mensaje:'sede incorrecto'});
    }
    // console.log({estado: 'Exito', datos: cexiste, mensaje:'sede obtenido'});

    return res.status(200).send({estado: 'Exito', datos: cexiste, mensaje:'sede obtenido'});
    // res.status(200).send('Se agrego correctamente');


});

module.exports = router;
