// récupération du client mangodb
var MongoClient = require("mongodb").MongoClient;

//connection a une base
MongoClient.connect('mongodb://localhost:27017/mongotest', function(err, db){
   if(err) throw err;
    // db est l'objet base de donnée
   console.log("connected to mangotest");
    var collectionFilm = db.collection('films');

    collectionFilm.insert({
        "titre" : "La citeé de la peur",
        "annee" : 1994,
        "realisateur" : "chabat",
        "rating" : 5
    }, function(err, result){
        // ici result contient les informations sur l'opération réalisé
        // dont, dans le cas présent, ops contient les lignes insérées
        console.log(result.ops.length + " Document inserted");
        for (var i = 0; i < result.ops.length; i++)
        {
            console.log(result.ops[i]._id +  " -> " + result.ops[i].titre);
        }
        // findOne renvoie le premier enregistrement qui remplit la clause where fournie
        collectionFilm.findOne({"titre" : "la cité de la peur"}, function(err, doc){
            if (err) throw err;

            console.log( "Le film " + doc._id + " -> " + doc.titre);
        })
    });
});