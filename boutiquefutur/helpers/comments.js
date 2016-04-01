var Models = require('../models'),
    async = require('async');


module.exports = {
    newest: function(callback) {
        Models.Comment.find({}, {}, { limit: 5, sort: {'timestamp' : -1}}, function(err, comments) {
           async.each(comments,
                      function(comment, next) {
                          // fonction appellée pour chaque comment dans comments
                          
                          // je recupère l'image associée au commentaire
                          Models.Image.findOne({_id : comment.image_id}, function(err, image) {
                             if (err) throw err;
                             // et je la référence dans la propriété virtuelle 'comment.image'
                             comment.image = image;
                             next(err); 
                          });
                      },
                      function(err) {
                          // fonction appellée quand tous les callback du each on fini
                          if (err) throw err;
                          // nous renvoyons le tableau des derniers commentaires
                          // enrichis avec leur image associée
                          callback(err, comments);
                      });
        });      
    }
};