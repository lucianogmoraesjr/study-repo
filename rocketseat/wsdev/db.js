const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./ws.db");

db.serialize(function(){

    //create table
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            url TEXT
        );
    `);

    //insert data
    // const query = `
    //     INSERT INTO ideas(
    //         image,
    //         title,
    //         category,
    //         description,
    //         url
    //     ) VALUES(?,?,?,?,?);
    // `;

    // const values = [
    //     "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    //     "Curso de Programação",
    //     "Estudo",
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //     "https://rocketseat.com.br"
    // ]
    // db.run(query, values, function(err){
    //     if(err) return console.log(err)

    //     console.log(this)
    // });

    //delete data
    // db.run(`DELETE FROM ideas WHERE id = ?`, [3], function(err){
    //     if(err) return console.log(err)

    //     console.log("Deletado com sucesso", this)
    // })

    //consult data
    // db.all(`SELECT * FROM ideas;`, function(err, rows){
    //     if(err) return console.log(err)

    //     console.log(rows)
    // })

})

module.exports = db