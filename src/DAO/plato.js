var mariaDb = require('../db/db');

async function getMasVendidos(Id_sede) {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("select sum(a.cantidad_ped) as total, m.descripcion as plato, concat(s.direccion,  ' - ',  s.barrio) as ubicacion from atencion as a inner join menu as m on a.id_menu = m.id_menu inner join sede as s on a.id_sede = s.id_sede where a.id_sede = ? group by a.id_menu order by total desc limit 5;", [Id_sede]);
        conn.release();
        // console.log(resp.length);
        if(resp.length === 0){
            return " ";
        }else{
            var platoJSON = [];
            resp.forEach(function (plat, index, arr) {
                platoJSON.push(
                    {
                        Total: plat.total,
                        Plato: plat.plato,
                        Ubicacion: plat.ubicacion
                    }
                );

            });
            return platoJSON;
        }

    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {getMasVendidos};
