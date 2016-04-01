var events = require('events');

// Création d'un emetteur d'évenements
var eventEmitter = new events.EventEmitter();

var ecouteur1 = function(){
    console.log("appel de ecouteur 1");
};

var ecouteur2 = function(){
    console.log("appel de ecouteur 2");
};

//Ajout d'un écouteur supplémentaire
var ecouteur3 = function(){
    console.log("appel de ecouteur 3");
};

var ecouteur4 = function(){
    console.log("appel de ecouteur 4");
};


eventEmitter.on('connection', ecouteur1);
eventEmitter.once('connection', ecouteur4); //il sera appelé qu'une seule fois et oublié après l'évenement
eventEmitter.on('deconnection', ecouteur2);

console.log("-----------------------------------------");
eventEmitter.emit('connection');
console.log("-----------------------------------------");
eventEmitter.emit('deconnection')
console.log("-----------------------------------------");

eventEmitter.addListener('connection', ecouteur3);
console.log("-----------------------------------------");
eventEmitter.emit('connection');
console.log("-----------------------------------------");
