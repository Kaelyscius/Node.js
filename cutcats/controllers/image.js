var fs = require('fs'),
    path = require('path'),
    sidebar = require('../helpers/sidebar'),
    Models = require('../models'),
    md5 = require('MD5');

module.exports = {
    create: function (req, res) {
        /*console.log("titre = " + req.body.title);
         console.log("description = " + req.body.description);
         console.log("filename = " + req.files[0].originalname);
         console.log("chemin fichier temp = " + req.files[0].path);

         //revenir vers la page d'accueil
         res.redirect('/');*/
        var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var imgUrl = '';
        for (var i = 0; i < 6; i++) {
            //Je tire un caratère au hasard 6 fois
            imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        Models.Image.find({filename: imgUrl}, function (err, images) {
            if (images.length > 0) {
                console.log('Image déjà existante, jouez au loto...')
            } else {
                // Je récupère le chemin du fichier temporaire uploadé
                var tmpPath = req.files[0].path;
                // On récupère l'extention
                var ext = path.extname(req.files[0].originalname).toLocaleLowerCase();

                if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {

                    // on construit le chemin cible
                    var targetPath = path.resolve('./public/upload/' + imgUrl + ext);
                    fs.rename(tmpPath, targetPath, function (err) {
                        if (err) throw err;

                        console.log("Renommage réussi ->" + targetPath);

                        // Création de l'instance de l'image a sauvegarder
                        var newImage = new Models.Image({
                            titre: req.body.title,
                            filename: imgUrl + ext,
                            description: req.body.description
                        });
                        // On sauvegarde l'image en base
                        newImage.save(function (err, image) {
                            if (err) throw err;
                            console.log('Image Save ->' + image.uniqueId);
                            res.redirect('/images/' + image.uniqueId); // a changer par la suite
                        })
                    });
                } else {
                    //Fichier refusé (pas une image) effacement de ce fichier et on renvoie une erreur
                    console.log("Effacement fichier temporaire non accepté");
                    fs.unlink(tmpPath, function (err) {
                        if (err) throw err;
                        res.json(500, {error: 'only images are alloweb'});
                    });
                }
            }
        })
    },
    index: function (req, res) {
        var viewModel = {
            image: {},
            comments: []
        };

        console.log("affichage image" + req.params.image_id); // Le params est quelque chose qui vien de l'url
        // Récupérer l'image depuis la base mongoDB // $regex = % LIKE %
        Models.Image.findOne({filename: {$regex: req.params.image_id}}, function (err, image) {
            if (err) throw err;

            //Nous avons notre enregistrement image
            if (image) {
                image.views = image.views + 1;
                viewModel.image = image;
                image.save();

                // Récupérer les commentaires associés a l'image
                Models.Comment.find(
                    {image_id: image._id},
                    {},
                    {sort: {timestamp: 1}},
                    function (err, comments) {
                        if (err) throw err;
                        viewModel.comments = comments;
                        sidebar(viewModel, function (err, viewModel) {
                            if (err) {
                                throw err;
                            }
                            res.render('image', viewModel);
                        });

                    }
                )
            }
        })
    },
    //Cette action sera appelé en AJAX, et renvoie une réponse en Json
    like: function (req, res) {
        Models.Image.findOne({filename: {$regex: req.params.image_id}}, function (err, image) {
            //Controle qu'il n'y a pas d'erreur et qu'on récupère bien une image
            if (!err && image){
                image.likes = image.likes + 1;
                image.save(function (err) {
                    if(err) throw err;
                    //Envoie de la réponse en json
                    //res.json encode en json le paramettre passé (Format Objet Json) et renvoie la réponse
                    res.json({likes: image.likes});
                })
            }else{
                //Si image supprimé entre temps
                res.json(500, {error:'unknow Image'});
            }
        })
    },
    comment: function (req, res) {
        Models.Image.findOne({filename: {$regex: req.params.image_id}}, function (err, image) {
            //Controle qu'il n'y a pas d'erreur et qu'on récupère bien une image
            if (!err && image){
                //Nous avons récupéré l'image qui sera associée au commentaire
                //soit en passant l'objet entier exemple :
                /*var newComment = new Models.Comment({
                    comment : req.body.comment,
                    name : req.body.name,
                    email: req.body.email
                });*/
                var newComment = new Models.Comment(req.body);

                newComment.gravatar = md5(newComment.email);
                newComment.image_id = image._id;
                newComment.save(function (err, comment) {
                    if(err) throw err;
                    res.redirect("/images/" + image.uniqueId + '#' + comment._id);

                })
            }else {
                //Erreur ou image inconnue
                res.redirect('/')
            }
        })
    },
    remove: function (req, res) {
        // On récupère l'image a effacer
        Models.Image.findOne({filename: {$regex: req.params.image_id}}, function (err, image) {
            if(err) throw err;
            // Suppression du fichier dans l'upload
            fs.unlink(path.resolve('./public/upload/' + image.filename), function (err) {
                if(err) throw err;
                // Suppression des commentaires associés
                Models.Comment.remove({image_id: image._id}, function (err) {
                    if(err) throw err;
                    // Suppression de l'image elle même
                    image.remove(function (err) {
                        if(!err){
                            res.json(true);
                        }else{
                            res.json(false);
                        }

                    });
                })
            });
        });

    }
};