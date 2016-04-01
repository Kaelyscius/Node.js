//Stats sur les images
var Models = require('../models');

module.exports = {
    popular : function(callback){
        //paramettre : find
        // 1er : where
        // 2eme : select
        // 3eme : tri / limite etc
        //dernier parametre c'est le callback
        Models.Image.find({}, {}, {sort : {likes : -1}, limit : 5}, function (err, images) {
            if(err) throw err;
            callback(null, images);
        })

    }
};