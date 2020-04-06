var express = require('express');
var atencionDAO = require('../DAO/atencion');
var router = express.Router();

router.post('/atenciones', async function(req, res, next) {




            var pexiste = await atencionDAO.getAtenciones();
            if(pexiste === " " || pexiste === null){
                return res.status(200).send({estado: 'Fallo', mensaje:'atenciones incorrecto'});
            }
            //console.log(pexiste);

            return res.status(200).send({estado: 'Exito', datos: pexiste, mensaje:'atenciones obtenidos'});
            // res.status(200).send('Se agrego correctamente');



});


router.post('/porId', async function(req, res, next) {
    var atencion = req.body;
    if (!atencion){
        return  res.status(200).send({estado: 'Fallo', mensaje:'Datos incorrectos'});
    }
    const token = req.headers['access-token'];
    // console.log(token);



            var pexiste = await atencionDAO.getAtencionPorID(atencion.id);
            if(pexiste === " " || pexiste === null){
                return res.status(200).send({estado: 'Fallo', mensaje:'atencion incorrecto'});
            }
            //console.log(pexiste);

            return res.status(200).send({estado: 'Exito', datos: pexiste, mensaje:'atencion obtenido'});
            // res.status(200).send('Se agrego correctamente');



});

router.post('/agregar', async function(req, res, next) {
    var atencion = req.body;
    if (!atencion){
        return  res.status(200).send({estado: 'Fallo', mensaje:'Datos incorrectos'});
    }



            var pexiste = await atencionDAO.agregarAtencion(atencion);
            if(pexiste === " " || pexiste === null){
                return res.status(200).send({estado: 'Fallo', mensaje:'atencion incorrecto'});
            }
            //console.log(pexiste);
            if (pexiste.estado === 'correcto')
                return res.status(200).send({estado: 'Exito', mensaje:'atencion agregado'});
            else
                return res.status(200).send({estado: 'Fallo', mensaje:'No se agrego atencion'});
            // res.status(200).send('Se agrego correctamente');



});

module.exports = router;
