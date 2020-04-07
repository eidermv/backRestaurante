var mariaDb = require('../db/db');
var sede = require('./sede');

async function getIngredientes() {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("select id_ingrediente, nombre, cantidad, id_sede from ingrediente;");
        conn.release();
        // console.log(resp.length);
        if(resp.length === 0){
            return " ";
        }else{
            var ingredienteJSON = [];
            resp.forEach(function (ing, index, arr) {

                ingredienteJSON.push(
                    {
                        Id: ing.id_ingrediente,
                        Nombre: ing.nombre,
                        Cantidad: ing.cantidad,
                        Sede: sede.getSedePorId(ing.id_sede)
                    }
                );

            });
            return ingredienteJSON;
        }

    } catch (err) {
        console.log(err);
        return null;
    }
}

async function getIngredientePorId(Id) {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("select id_ingrediente, nombre, cantidad, id_sede from ingrediente where id_ingrediente = ?;", [Id]);
        conn.release();
        // console.log(resp.length);
        if(resp.length === 0){
            return " ";
        }else{
            var ingredienteJSON = [];
            resp.forEach(function (ing, index, arr) {
                ingredienteJSON.push(
                    {
                        Id: ing.id_ingrediente,
                        Nombre: ing.nombre,
                        Cantidad: ing.cantidad,
                        Sede: sede.getSedePorId(ing.id_sede)
                    }
                );

            });
            return ingredienteJSON;
        }

    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {getIngredientes, getIngredientePorId};
