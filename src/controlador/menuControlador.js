var express = require('express');
var menuDAO = require('../DAO/menu');
var router = express.Router();


router.post('/menus', async function(req, res, next) {


    var cexiste = await menuDAO.getMenus();
    if(cexiste === " " || cexiste === null){
        return res.status(200).send({estado: 'Fallo', mensaje:'menus incorrecto'});
    }
    //console.log(pexiste);

    return res.status(200).send({estado: 'Exito', datos: cexiste, mensaje:'menus obtenidas'});
    // res.status(200).send('Se agrego correctamente');


});


router.post('/porId', async function(req, res, next) {
    var usuario = req.body;
    if (!usuario){
        return  res.status(200).send({estado: 'Fallo', mensaje:'Datos incorrectos'});
    }



    var cexiste = await menuDAO.getMenuPorId(usuario.id);
    if(cexiste === " " || cexiste === null){
        return res.status(200).send({estado: 'Fallo', mensaje:'menu incorrecto'});
    }
    // console.log({estado: 'Exito', datos: cexiste, mensaje:'menu obtenido'});

    return res.status(200).send({estado: 'Exito', datos: cexiste, mensaje:'menu obtenido'});
    // res.status(200).send('Se agrego correctamente');


});

module.exports = router;
