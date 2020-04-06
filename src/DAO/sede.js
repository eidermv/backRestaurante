var mariaDb = require('../db/db');

async function getSedes() {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("select id_sede, direccion, barrio from sede;");
        conn.release();
        // console.log(resp.length);
        if(resp.length === 0){
            return " ";
        }else{
            var sedeJSON = [];
            resp.forEach(function (sed, index, arr) {
                sedeJSON.push(
                    {
                        Id: sed.id_sede,
                        Direccion: sed.direccion,
                        Barrio: sed.barrio
                    }
                );

            });
            return sedeJSON;
        }

    } catch (err) {
        console.log(err);
        return null;
    }
}

async function getSedePorId(Id) {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("select id_sede, direccion, barrio from sede where id_sede = ?;", [Id]);
        conn.release();
        // console.log(resp.length);
        if(resp.length === 0){
            return " ";
        }else{
            var sedeJSON = [];
            resp.forEach(function (ing, index, arr) {
                sedeJSON.push(
                    {
                        Id: sed.id_sede,
                        Direccion: sed.direccion,
                        Barrio: sed.barrio
                    }
                );

            });
            return sedeJSON;
        }

    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {getSedes, getSedePorId};
