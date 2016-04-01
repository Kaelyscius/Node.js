var fs = require('fs'),
    http = require('http'),
    url = require('url'),
    zlib = require('zlib'),
    path = require('path');
    
var port = process.env.port|| 8081;
http.createServer(function(req,res){
    //exemple http://localhost:8081/toto.txt -> renvoi /toto.txt
    var pathFile = url.parse(req.url).pathname;
    var fname = pathFile.substr(1);
    var chemin = path.join(__dirname + "/content/" + fname);
    console.log("requête vers :" + chemin);
    
    var directoryResponse = function(req, res){
        //On renvoie l'header http
        res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
        //on envoie la réponse
        res.write('<h1>' + fname + ' est un repertoire</h1>');
        //On clot le flux
        res.end();
    }    
    var fileResponse = function(req, res){
        res.writeHead(200, {"Content-Type" : "text/html"});
        var lecteur = fs.createReadStream(chemin);
        // ecrit directement dans la réponse le contenu
        lecteur.pipe(res);        
    }   
    
    var zipResponse = function(req, res){
        res.writeHead(200, 
                    {"Content-type" : "application/zip",
                     "Content-Disposition" : 'attachment; filename="'+ fname+'"'
                     }
        );
        var lecteur = fs.createReadStream(chemin)
                        .pipe(zlib.createGzip())
                        .pipe(res);
    }
    var isZip = false;
    if(chemin.endsWith(".gz")){
        isZip = true;
        chemin = chemin.substr(0, chemin.length - 3);
        
    }
    //ca s'appel stat car c'est la fonction unix de base pour avoir les infos
    fs.stat(chemin, function(err, stats){
        if(err){
            res.writeHead(500);
            res.write("Erreur a l'ouverture de fichier");
            res.end();
        }else {
            if(stats.isDirectory()){
                directoryResponse(req, res);
            }else if (stats.isFile() && isZip){
                zipResponse(req, res);
            }else if (stats.isFile()){
                fileResponse(req, res);
            }else{
                res.writeHead(404);
                res.write("fichier non trouvé");
                res.end();
            }
        }
    });
}).listen(port);

console.log("server démarré sur http://localhost:" + port )