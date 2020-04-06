var mariaDb = require('../db/db');

async function getMenus() {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("select id_menu, descripcion, id_sede from menu;");
        conn.release();
        // console.log(resp.length);
        if(resp.length === 0){
            return " ";
        }else{
            var menuJSON = [];
            resp.forEach(function (men, index, arr) {
                menuJSON.push(
                    {
                        Id: men.id_menu,
                        Descripcion: men.descripcion,
                        Id_sede: men.id_sede
                    }
                );

            });
            return menuJSON;
        }

    } catch (err) {
        console.log(err);
        return null;
    }
}

async function getMenuPorId(Id) {
    try {
        let conn = await mariaDb.getConn();
        const resp = await conn.query("select id_menu, descripcion, id_sede from menu where id_menu = ?;", [Id]);
        conn.release();
        // console.log(resp.length);
        if(resp.length === 0){
            return " ";
        }else{
            var menuJSON = [];
            resp.forEach(function (men, index, arr) {
                menuJSON.push(
                    {
                        Id: men.id_menu,
                        Descripcion: men.descripcion,
                        Id_sede: men.id_sede
                    }
                );

            });
            return menuJSON;
        }

    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {getMenus, getMenuPorId};
