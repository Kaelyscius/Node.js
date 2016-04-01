var express = require("express"),
    path = require("path");

//creation de l'application express
var app = express();

app.get('/', function(req, res){
   res.send("bonjour depuis express"); 
});
app.get('/info', function(req, res){
   res.send("serveur tournant sous node.js"); 
});

app.get('/test/:param1', function (req, res) {
    res.send("vous avez demandé: " + req.params.param1);
})

app.get('/test/:param1/comment', function (req, res) {
    res.send("vous avez demandé: " + req.params.param1);
})

var server = app.listen(process.env.PORT || 8081, function(){
   var port = server.address().port;
   console.log("Serveur démarré sur : http://localhost:" + port); 
});

//Sert a servir des fichiers statics (html, js, image)
app.use('/public/', express.static(path.join(__dirname, './public')));