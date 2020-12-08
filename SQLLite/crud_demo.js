let localrun = (db, sql, params) => {
    db.run(sql, params, function(err) {
        if (err) return console.error(err.message);
        let action = sql.substr(0,5).toLowerCase();
        console.log(`Rows ${action}ed ${this.changes}`);
    });
}

let sqlUpdate = (db) => {
    let lang = ['ANSI C', 'C++'];
    let sql = `UPDATE brian 
                SET Name = ? 
                WHERE Name = ?`;
    
    localrun(db, sql, lang);    
};

let sqlInsert = (db) => {
    let languages = ['C++', 'C#', 'Python', 'Rust', 'Haskell'];
    let placeholders = languages.map((language) => '(?)').join(',');
    let sql = 'INSERT INTO brian(Name) VALUES ' + placeholders;

    //output the INSERT stmt
    console.log(sql);

    localrun(db, sql, languages);
};

let sqlDelete = (db, name) => {
    let sql = `DELETE FROM brian WHERE name = ?`;
    localrun(db, sql, name);
};

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('../chinook.db');

//put statement here

db.close();