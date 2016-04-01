console.log("Demarrage node js");

//Tous les chargements de modules se font via require
// meme nos propres module seront chargé avec require
var http = require('http');

// Je crée un serveur, chaque requete http entrante
// rappelera le callback passé en parametre de createServer
//Ce callbal recevra deux parametres, la requête entrante 
// et la réponse à renvoyer
http.createServer(function(request, response){
    //http 200 -> pas d'erreur
    response.writeHead(200, "content-type: 'text/plain'");
    response.end('bonjour monde');
}).listen(8081); //Le serveur écoute sur le port 8081

console.log("serveur demarré sur http://localhost:8081");