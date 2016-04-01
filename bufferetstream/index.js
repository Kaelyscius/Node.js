
// J'alloue un buffer de taille 10
// les buffers sont fortement optimisable
// Par le moteur javascript, beaucoup plus que des strings
var buf1 = new Buffer(10);
var buf2 = new Buffer("bonjour le monde", "utf-8");

//write permet d'écrire dans un buffer a une position choisi
// Si les données dépasse la taille du buffer, elles sont tronquées
buf1.write("bonjour dans buffer1", 0 );

console.log(buf1.toString());
console.log(buf2.toString());

//buf3 contiendra l'alphabet
var buf3 = new Buffer(26);

for(var i=0; i < 26; i++){
    buf3[i] = i + 97; //97 code ascII de 'a'
} 
console.log(buf3.length);
console.log(buf3.toString());

var buf4 = new Buffer.concat([buf1, buf2]);
console.log(buf4.toString());

console.log(buf1.compare(buf2)); //compare les chaines de caractère de facon alphabetique
console.log(buf2.compare(buf1));

//
// Stream Node.js
// 4 types de flux
//
//Readable -> en lecture
//Writable -> en écriture
//Duplex   -> Lecture / Ecriture
//Transform -> Transforme/modifie les données entre l'entrée et la sortie
//
//Un flux est en fait un eventEmitter
//
//Par exemple :
// data -> quand des données son disponibles en lecture
// end -> quand il n'y a plus de données à lire
// finish -> quand il n'y a plus de données à écrire
// error -> en cas d'erreur


//require file system
//Je récupère le module d'accès au systeme de fichiers
var fs = require('fs');

//Lecture d'un fichier
var lecteur = fs.createReadStream('sample.txt');
var data = '';
lecteur.setEncoding('UTF8');

//CallBack appelé lorsqu'on recoit des données
lecteur.on('data', function(donnee){
    console.log('data received');
    data += donnee;
});

//callback appelé lorsqu'il n'y a plus de données à lire
lecteur.on('end', function(){
    console.log('stream is closed');
    console.log(data);
});


// stream en écriture
var ecrivain = fs.createWriteStream('sortie.txt');
//Je veux etre prévenu quand on a fini l'écriture
ecrivain.on('finish', function(){
    console.log("Ecriture fichier terminé");
});

for (var i = 1; i <= 10; i++ ){
    ecrivain.write("bonjour" + i, 'UTF8')
}
ecrivain.end();

console.log('fini');

// Utilisation des streams pour compresser des données
var zlib = require('zlib');

fs.createReadStream('sample.txt') // lecture
    .pipe(zlib.createGzip()) // compression
    .pipe(fs.createWriteStream('sample.txt.gz')); //ecriture