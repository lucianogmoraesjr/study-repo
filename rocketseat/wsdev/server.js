//express used to configure server
const express = require("express");
const server = express();

const db = require("./db");

// const ideas = [
//   
//    
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729077.svg",
//         title: "Receitas",
//         category: "Culinária",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         url: "https://rocketseat.com.br"
//     }
// ]


//configure static files
server.use(express.static("public"));

//req.body enable
server.use(express.urlencoded({ extended: true }));

//configure nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server,
    noCache: true
})

//route / created
server.get("/", function(req, res){

    db.all(`SELECT * FROM ideas;`, function(err, rows){
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        const reversedIdeas = [...rows].reverse();

        let lastIdeas = [];

        for(let idea of reversedIdeas){
            if(lastIdeas.length < 2){
                lastIdeas.push(idea);
            }
        }

        return res.render("index.html", {ideas: lastIdeas});
    })

    
});

server.get("/ideas", function(req, res){

    db.all(`SELECT * FROM ideas;`, function(err, rows){
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        const reversedIdeas = [...rows].reverse();

        return res.render("ideas.html", {ideas: reversedIdeas});

    })

});

server.post("/", function(req, res){

    //insert data
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            url
        ) VALUES(?,?,?,?,?);
    `;

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.url
    ]
    db.run(query, values, function(err){
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        return res.redirect("/ideas");
    });

});

server.get("/ideas/delete/:id", function(req, res){

    const id = req.params.id

    db.run(`DELETE FROM ideas WHERE id = ?`, [id], function(err){
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        return res.redirect("/ideas");
    })

});

//active server port 3000
server.listen(3000);