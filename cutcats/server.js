var express = require('express'),
    mongoose = require('mongoose'),
    config = require('./server/configure.js');// C'est ici que l'on configurera le serveur.
    
var app = express();
app.set('port', process.env.PORT || 8081);
app.set('views', __dirname + '/views'); // répertoire contenant les vues 

app = config(app); //J'appel configure qui met en place les middleware et les routes
mongoose.connect('mongodb://localhost:27017/cutecats');// Connexion a la base mongodb
mongoose.connection.on('open', function (){
    console.log("Connection à la base réussi")
    var server = app.listen(app.get('port'), function() {
        console.log("Le serveur est démarré sur localhost:"+app.get('port'));
    });
});



