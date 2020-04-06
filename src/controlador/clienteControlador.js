var express = require('express');
var clienteDAO = require('../DAO/cliente');
var router = express.Router();


router.post('/clientes', async function(req, res, next) {


    var cexiste = await clienteDAO.getClientes();
    if(cexiste === " " || cexiste === null){
        return res.status(200).send({estado: 'Fallo', mensaje:'clientes incorrecto'});
    }
    //console.log(pexiste);

    return res.status(200).send({estado: 'Exito', datos: cexiste, mensaje:'clientes obtenidas'});
    // res.status(200).send('Se agrego correctamente');


});


router.post('/porId', async function(req, res, next) {
    var usuario = req.body;
    if (!usuario){
        return  res.status(200).send({estado: 'Fallo', mensaje:'Datos incorrectos'});
    }



    var cexiste = await clienteDAO.getClientePorId(usuario.id);
    if(cexiste === " " || cexiste === null){
        return res.status(200).send({estado: 'Fallo', mensaje:'cliente incorrecto'});
    }
    // console.log({estado: 'Exito', datos: cexiste, mensaje:'cliente obtenido'});

    return res.status(200).send({estado: 'Exito', datos: cexiste, mensaje:'cliente obtenido'});
    // res.status(200).send('Se agrego correctamente');


});

module.exports = router;
