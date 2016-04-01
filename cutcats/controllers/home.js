var sidebar = require('../helpers/sidebar'),
    ImageModel = require('../models').Image; // Require, par defaut ira chercher index.js

module.exports = { // on export direct un objet

    index : function(req, res){
        //res.send(200, "<h2>Bonjour depuis index controller</h2>");
        
        
        //Affichage de la vue index avec pour l'instant un viewModel Vide
        /*var viewModel = {
            images: ImageModel.images

        };*/

        //ici on aura la liste de nos images + un formulaire pour uploader
        var viewModel = {
            images : []
        };

        //Requete toutes les images en triant par ordre décroissant c'est a dire de la plus récente à la plus ancienne
        ImageModel.find({}, {}, {sort: {timestamp: -1}}, function (err, images) {
            if(err) throw err;
            //Mettre dans le views model les images récupéré
            viewModel.images = images;
            sidebar(viewModel, function(err, viewModel){
                if (err){
                    throw err;
                }

                res.render('index', viewModel);
            });
        });
    }
    
};