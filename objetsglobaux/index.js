console.log("fichier actuel: " + __filename);
console.log("repertoire actuel: " + __dirname);
//console aussi est un objet global

console.log("env= "+ process.env);
for(var prop in process.env){
    console.log(prop + " ---> " + process.env[prop]);
}

var port = process.env.PORT || 3456;
console.log("port=" + port);