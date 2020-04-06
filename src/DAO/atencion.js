var mariaDb = require('../db/db');

//SELECT id_atencion, id_sede, id_cliente, id_menu, cantidad_ped
// FROM atencion;
async function getAtenciones() {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("select id_atencion, id_sede, id_cliente, id_menu, cantidad_ped from atencion;");
        conn.release();

        var atencionesJSON = [];
        resp.forEach(function (aten, index, arr) {
            atencionesJSON.push(
                {
                    Id: aten.id_atencion,
                    Id_sede: aten.id_sede,
                    Id_cliente: aten.id_cliente,
                    Id_menu: aten.id_menu,
                    Cantidad: aten.cantidad_ped
                }
            );

        });
        return atencionesJSON;

    }
    catch (err) {
        console.log(err);
        return null;
    }

}

async function getAtencionPorID(Id) {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("select id_atencion, id_sede, id_cliente, id_menu, cantidad_ped from atencion where id_atencion = ?;", [Id]);
        conn.release();
        // console.log(resp.length);
        if(resp.length === 0){
            return " ";
        }else{
            var atencionesJSON = {};
            resp.forEach(function (prod, index, arr) {
                atencionesJSON=
                    {
                        Id: aten.id_atencion,
                        Id_sede: aten.id_sede,
                        Id_cliente: aten.id_cliente,
                        Id_menu: aten.id_menu,
                        Cantidad: aten.cantidad_ped
                    };

            });
            return atencionesJSON;
        }

    } catch (err) {
        console.log(err);
        return null;
    }
}

//INSERT INTO prueba_siata.atencion
// (id_sede, id_cliente, id_menu, cantidad_ped)
// VALUES(0, 0, 0, 0);

async function agregarAtencion(atencion) {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("insert into atencion (id_sede, id_cliente, id_menu, cantidad_ped) values ( ?, ?, ?, ?);", [Number(atencion.id_sede), Number(atencion.id_cliente),  Number(atencion.id_menu), Number(atencion.cantidad_ped)]);
        conn.release();

        if (resp.affectedRows > 0){
            return {estado:'correcto', mensaje: 'Se agrego correctamente'};
        }else {
            return {estado:'Fallo', mensaje: 'No se agrego'};
        }

    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {getAtenciones, getAtencionPorID, agregarAtencion };