var stats = require('./stats'),
    Images = require('./images'),
    Comments = require('./comments'),
    async = require('async');

module.exports = function(viewModel, callback) {
    // l'appel a sidebar collecteras les données nécéssaire à l'affichage
    // de celle-ci, a savoir
    //  1) les statistiques (nbr de likes, views, etc.)
    //  2) les images les plus populaires
    //  3) les derniers commentaires
    // a terme, nous utiliserons async pour requeter ces informations en
    // parallele, pour l'instant, un simple callback
    // par exemple: index -> sidebar(viewModel, callback) -> callback(render....)
    
    async.parallel([
        function(next) {
            stats(next);
        },
        function(next) {
            Images.popular(next);
        },
        function(next) {
            Comments.newest(next);
        }
    ], function (err, results) {
        if (err) throw err;
        // results[0] -> retour de stats
        // results[1] -> retour de Images.popular
        viewModel.sidebar = {
            stats: results[0],
            popular: results[1],
            newest: results[2]
        };
        callback(err, viewModel);
    });
      
};