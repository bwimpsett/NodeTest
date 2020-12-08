let sqlSerialize = (db, title, artistId) => {
    db.serialize(() => {
        db.run(`INSERT INTO albums (Title, ArtistId)
                VALUES ('${title}', ${artistId})`)
        .run(`UPDATE albums SET Title = '${title}' WHERE AlbumId = 7`)
        .each(`SELECT Title FROM albums`, (err, row) => {
            if (err) throw err;
            console.log(row.Title);
        });
    });
};

let dbSum = (a, b, db) => {
    db.get('SELECT (? + ?) sum', [a, b], (err, row) => {
        if (err) console.error(err.message);
        console.log(`The sum of ${a} and ${b} is ${row.sum}`);
    });
};

let sqlParallelize = (db) => {
    db.parallelize(() => {
        dbSum(1, 1, db);
        dbSum(2, 2, db);
        dbSum(3, 3, db);
        dbSum(4, 4, db);
        dbSum(5, 5, db);        
    });
};

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('../chinook.db', (err) => {
    if (err) console.error(err.message);
});

// sqlSerialize(db, 'Brian Douglas', 14);
sqlParallelize(db);

db.close((err) => {
    if (err) return console.error(err.message);
});