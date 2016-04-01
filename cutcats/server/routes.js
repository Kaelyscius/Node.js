var express = require('express'),
    router = express.Router(),
    home = require('../controllers/home'),
    image = require('../controllers/image');
    
module.exports = function(app) {
  router.get('/', home.index); // sur l'url / on va chercher la methode index du controller home.
  router.get('/images/:image_id', image.index); // afficher l'image
  router.post('/images', image.create); // upload d'image
  router.post('/images/:image_id/like', image.like); // upload d'image
  router.post('/images/:image_id/comment', image.comment); // upload d'image
  router.delete('/images/:image_id', image.remove);


  app.use(router);  
};