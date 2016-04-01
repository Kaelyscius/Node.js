var Models = require('../models');

module.exports = {
    popular: function(callback) {
        // find
        // 1er parametre -> where
        // 2eme parametre -> select (choix des champs)
        // 3eme parametre -> tri, limite, etc
        // dernier parametre -> callback
        Models.Image.find({}, {}, { sort: {likes: -1}, limit: 5}, function(err, images) {
           if (err) throw err;
           callback(null, images); 
        });
    }
}