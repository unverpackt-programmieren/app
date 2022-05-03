const config = require("./../config/config");
module.exports = (sqlQuery, values) => {
    return new Promise((resolve, reject) => {
        const db = window.sqlitePlugin.openDatabase(config.db);
        db.transaction(function (tx) {
            tx.executeSql(sqlQuery, values, function (tx, rs) {
                const value = rs.rows.item(0);
                resolve({
                    rs:rs
                });
            }, function (tx, error) {
                reject(error);
            });
        });
    })
}