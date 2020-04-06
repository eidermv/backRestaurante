var express = require('express');
var platoDAO = require('../DAO/plato');
var router = express.Router();


router.post('/mas_vendidos', async function(req, res, next) {

    var sede = req.body;
    if (!sede){
        return  res.status(200).send({estado: 'Fallo', mensaje:'Datos incorrectos'});
    }

    var cexiste = await platoDAO.getMasVendidos(sede.id);
    if(cexiste === " " || cexiste === null){
        return res.status(200).send({estado: 'Fallo', mensaje:'platos incorrecto'});
    }
    //console.log(pexiste);

    return res.status(200).send({estado: 'Exito', datos: cexiste, mensaje:'platos obtenidas'});
    // res.status(200).send('Se agrego correctamente');


});

module.exports = router;
