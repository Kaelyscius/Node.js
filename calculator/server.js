var express = require('express')
    path = require('path');

// Création de l'application express
var app = express();

app.get('/add/:param1/:param2', function(req, res){
    var sum = parseInt(req.params.param1) + parseInt(req.params.param2);
    res.send('Result : '+sum); 
});

app.get('/sub/:param1/:param2', function(req, res){
    var sum = parseInt(req.params.param1) - parseInt(req.params.param2);
    res.send('Result : '+sum); 
});

app.get('/mul/:param1/:param2', function(req, res){
    var sum = parseInt(req.params.param1) * parseInt(req.params.param2);
    res.send('Result : '+sum); 
});

app.get('/div/:param1/:param2', function(req, res){
    var sum = parseInt(req.params.param1) / parseInt(req.params.param2);
    res.send('Result : '+sum); 
});

var server = app.listen(process.env.PORT || 8081, function(){
    var port = server.address().port;
    console.log("Serveur démarré sur http://localhost:"+port);
});