var express = require('express'),
    mongoose = require('mongoose'),
    config = require('./server/configure.js'); // c'est ici que l'on configurera le serveur

var app = express();
app.set('port', process.env.PORT || 8081);
app.set('views', __dirname + '/views'); //répertoire contenant les vues

app = config(app); // j'appel configure qui met en place les middleware et les routes 
mongoose.connect('mongodb://localhost/boutiquefutur'); // connection a la base mongodb

mongoose.connection.on('open', function() {
    console.log("connecion a la base réussie");
    var server = app.listen(app.get('port'), function() {
        console.log("serveur démarré sur http://localhost:" + app.get('port')); 
    });    
})


