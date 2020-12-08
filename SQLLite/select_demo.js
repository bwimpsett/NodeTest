let sqlAll = (db) => {
    let sql = `SELECT DISTINCT Name name from playlists
                ORDER BY name`;

    db.all(sql, [], (err, rows) => {
        if (err) throw err;
        rows.forEach((row) => {
            console.log(row.name);
        });
    });
};

let sqlGet = (db, playlistId) => {
    let sql = `SELECT PlaylistId id, Name name
                FROM playlists WHERE PlaylistId = ?`;

    db.get(sql, [playlistId], (err, row) => {
        if (err) return console.error(err.message);
        return row 
                ? console.log(row.id, row.name)
                : console.log(`No playlist found the id ${playlistId}`);
    });
};

let sqlEach = (db,country) => {
    let sql = 
        `SELECT FirstName firstName, LastName lastName, Email email 
         FROM customers
         WHERE Country = ?
         ORDER BY FirstName`;
    db.each(sql, [country], (err, row) => {
        if (err) throw err;
        console.log(`${row.firstName} ${row.lastName} - ${row.email}`);
    });
};

let main = (crudType, parameter) => {
    const sqlite3 = require('sqlite3').verbose();

    let db = new sqlite3.Database('../chinook.db');
    crudType(db, parameter);
    db.close();
};

main(sqlAll);