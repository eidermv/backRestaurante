var express = require('express');
var ingredienteDAO = require('../DAO/ingrediente');
var router = express.Router();


router.post('/ingredientes', async function(req, res, next) {


            var cexiste = await ingredienteDAO.getIngredientes();
            if(cexiste === " " || cexiste === null){
                return res.status(200).send({estado: 'Fallo', mensaje:'Ingredientes incorrecto'});
            }
            //console.log(pexiste);

            return res.status(200).send({estado: 'Exito', datos: cexiste, mensaje:'Ingredientes obtenidas'});
            // res.status(200).send('Se agrego correctamente');


});


router.post('/porId', async function(req, res, next) {
    var usuario = req.body;
    if (!usuario){
        return  res.status(200).send({estado: 'Fallo', mensaje:'Datos incorrectos'});
    }



            var cexiste = await ingredienteDAO.getIngredientePorId(usuario.id);
            if(cexiste === " " || cexiste === null){
                return res.status(200).send({estado: 'Fallo', mensaje:'Ingrediente incorrecto'});
            }
            // console.log({estado: 'Exito', datos: cexiste, mensaje:'Ingrediente obtenido'});

            return res.status(200).send({estado: 'Exito', datos: cexiste, mensaje:'Ingrediente obtenido'});
            // res.status(200).send('Se agrego correctamente');




});

module.exports = router;
