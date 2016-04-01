var express = require('express'),
    router = express.Router(),
    taches = require('../controllers/taches');

module.exports = function(app) {
    router.get('/', taches.index); // sur l'url / on va chercher la methode index du controller home.
    router.post('/taches', taches.create); //affiché ce qui est renvoyé par le formulaire
    router.get('/taches', taches.list); // listé les taches existante

    app.use(router);
};