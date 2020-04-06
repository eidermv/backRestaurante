var mariaDb = require('../db/db');

async function getClientes() {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("select id_cliente, nombre, apellido from cliente;");
        conn.release();
        // console.log(resp.length);
        if(resp.length === 0){
            return " ";
        }else{
            var clienteJSON = [];
            resp.forEach(function (clien, index, arr) {
                clienteJSON.push(
                    {
                        Id: clien.id_cliente,
                        Nombre: clien.nombre,
                        Apellido: clien.apellido
                    }
                );

            });
            return clienteJSON;
        }

    } catch (err) {
        console.log(err);
        return null;
    }
}

async function getClientePorId(Id) {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("select id_cliente, nombre, apellido from cliente where id_cliente = ?;", [Id]);
        conn.release();
        // console.log(resp.length);
        if(resp.length === 0){
            return " ";
        }else{
            var clienteJSON = [];
            resp.forEach(function (clien, index, arr) {
                clienteJSON.push(
                    {
                        Id: clien.id_cliente,
                        Nombre: clien.nombre,
                        Apellido: clien.apellido
                    }
                );

            });
            return clienteJSON;
        }

    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {getClientes, getClientePorId};
