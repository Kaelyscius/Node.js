var path = require('path'),
    routes = require('./routes'), // Le ./ veux dire que c'est un fichier a l'intérieur du dossier server.
    exphbs = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    errorHandler = require('errorhandler');

module.exports = function (app) {
    //configuration du moteur de vue handlebars
    //on le crée puis le rend disponible pour express(via app.engine)
    //en meme temps, on configure ses parametres et associe l'extention
    //.handlebars à ce moteur
    app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts', //ici on peut définir directement un répertoire
        partialsDir: [app.get('views') + '/partials'] // on peut faire un tableau pour avoir plusieurs répertoire.
    }).engine);
    // on sélectionne ce moteur
    app.set('view engine', 'handlebars');

    //Morgan est un filtre (middleware) pour le logging du serveur
    app.use(morgan('dev'));

    //mise en place de la gestion simplifiée des formulaires et url encodés
    app.use(bodyParser.urlencoded({'extended': true}));

    app.use(cookieParser('ma-valeur-secrete'));

    routes(app); // mise en place des routes

    //serveur de contenu statique (.JS, IMG, CSS)
    app.use('/public/', express.static(path.join(__dirname, '../public')));

    // erreur détaillé en mode dev
    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }

    return app;
};