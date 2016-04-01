var stats = require('./stats'),
    Images = require('./images'),
    Comments = require('./comments')
    async = require('async');

module.exports = function (viewModel, callback) {
    //l'appel a sidebar collecteras les données nécessaires à l'affichage
    //de celles ci. A savoir
    // 1°) les stats (nb likes, views etc)
    // 2°) les images les plus populaires
    // 3°) les derniers commentaires
    // A terme nous utiliseront async pour requeter ces données la en paralelle
    // pour l'instant un simple callback.
    //index -> sidebar(viewmodel, callback) -> callback(render avec info)

    async.parallel([
        function (next) {
            stats(next);
        },
        function (next) {
            Images.popular(next);
        },
        function (next) {
            Comments.newest(next);
        }
    ], function (err, results) {
        if(err) throw err;
        viewModel.sidebar = {

            //results[0] -> retour de stats
            //results[1] -> retour de Images.popular
            stats: results[0],
            popular: results[1],
            newest: results[2]

        };
        callback(err, viewModel);

    });
};