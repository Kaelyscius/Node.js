var Models = require('../models'),
    async = require('async');

module.exports = function (callback) {
    /* var stats = {
     images : 15,
     comments : 25,
     views : 55,
     likes : 45
     };*/

    async.parallel([
        //Le parametre next permet de dire a async que le traitement est fini et qu'il peut passer au suivant
        function (next) {
            //Je compte les images et rappel le callback d'async(next) avec le résultat
            Models.Image.count({}, next);
        },
        function (next) {
            //Je compte les Commentaires et rappel le callback d'async(next) avec le résultat
            Models.Comment.count({}, next);
        },
        function (next) {
            //Aggregation des vues totales
            // C'est a dire la sommes des vues des images
            // 1er argument de aggregate : la spécification du regroupement et le calcul à effectuer
            //2eme argument : le callback avec en parametre un tableau
            // dans ce tableau -> une ligne = un groupe
            //Chaque attribut de cette ligne correspond à un des calculs demandés
            //Dans la spécification des calculs (ici 1 seul, viewsTotal = somme des views)
            Models.Image.aggregate({
                    $group: {
                        _id: '1',
                        viewsTotal: {$sum: '$views'} // $views fait référence a la colonne dans mongoDB
                    }
                },
                function (err, result) {
                    if (err) throw err;
                    var viewsTotal = 0;
                    for (var i = 0; i < result.length; i++) {
                        viewsTotal += result[i].viewsTotal;
                    }
                    next(null, viewsTotal);
                });
        },
        function (next) {
            //Aggregation des likes totaux
            Models.Image.aggregate({
                    $group: {
                        _id: '1',
                        likesTotal: {$sum: '$likes'} // $likes fait référence a la colonne dans mongoDB
                    }
                },
                function (err, result) {
                    if (err) throw err;
                    var likesTotal = 0;
                    for (var i = 0; i < result.length; i++) {
                        likesTotal += result[i].likesTotal;
                    }
                    next(null, likesTotal);
                });
        }
    ], function (err, results) { // Le résults contient le tableau avec les 4 informations
        if (err) throw err;

        // Nous avons ici les résultats des 4 callbacks appelé par un async
        // Collectés dans résults qui sont retransmit au controller grace au callback fournit
        callback(null, {
            images: results[0],
            comments: results[1],
            views: results[2],
            likes: results[3],
        });

    });

};