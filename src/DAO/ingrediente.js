var mariaDb = require('../db/db');

async function getIngredientes() {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("select i.id_ingrediente, i.nombre, i.cantidad, i.id_sede, s.direccion, s.barrio from ingrediente as i, sede as s where s.id_sede = i.id_sede;");
        conn.release();
        // console.log(resp.length);
        if(resp.length === 0){
            return " ";
        }else{
            var ingredienteJSON = [];
            resp.forEach(function (ing, index, arr) {
				
				// const s = cargarSede(ing.id_sede);

                ingredienteJSON.push(
                    {
                        Id: ing.id_ingrediente,
                        Nombre: ing.nombre,
                        Cantidad: ing.cantidad,
                        Sede: {
                            Id: ing.id_sede,
                            Direccion: ing.direccion,
                            Barrio: ing.barrio
                        }
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

async function cargarSede(Id) {
    return await sede.getSedePorId(Id);
}

async function getIngredientePorId(Id) {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("select i.id_ingrediente, i.nombre, i.cantidad, i.id_sede, s.direccion, s.barrio from ingrediente as i, sede as s where i.id_ingrediente = ? and s.id_sede = i.id_sede ;", [Id]);
        conn.release();
        // console.log(resp.length);
        if(resp.length === 0){
            return " ";
        }else{
            var ingredienteJSON = [];
            resp.forEach(function (ing, index, arr) {
				// var s = await sede.getSedePorId(ing.id_sede);
                // const s = cargarSede(ing.id_sede);
                // console.log(ing);
                ingredienteJSON.push(
                    {
                        Id: ing.id_ingrediente,
                        Nombre: ing.nombre,
                        Cantidad: ing.cantidad,
                        Sede: {
                            Id: ing.id_sede,
                            Direccion: ing.direccion,
                            Barrio: ing.barrio
                        }
                    }
                );

            });

            // console.log(ingredienteJSON);

            return ingredienteJSON;
        }

    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {getIngredientes, getIngredientePorId};
