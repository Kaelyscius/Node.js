var Models = require('../models'),
    async = require('async');

module.exports = {
    newest: function (callback) {
        Models.Comment.find({}, {}, {limit: 5, sort: {'timestamp': -1}}, function (err, comments) {
            async.each(
                comments,
                function (comment, next) {
                    //fonction appellé pour chaque comment dans comments
                    //1er paramettre le where : ici une jointure
                    //Je récupère l'image associé au commentaire
                    Models.Image.findOne({_id: comment.image_id}, function (err, image) {
                        if (err) throw err;
                        // Et je la référence dans la propriété virtuelle 'comment.image'
                        comment.image = image;
                        next(err);
                    })
                },
                function (err) {
                    //fonction appellé quand tout les callback du each sont fini
                    if (err) throw err;
                    // Ici on renvoie le tableau des derniers commentaire enrichis avec leur image associé
                    callback(err, comments);
                });
        })
    }
};