//recuperation du module async
var async = require('async');

//plusieurs parametre (1: tout les callbak a rappeler)
async.parallel([
    function(next){
        console.log("appel du callback A");
        //fini, j'apelle next
        next(null, "donnee A");
    },
    function(next){
        console.log("appel du callback B");
        //fini, j'apelle next
        next(null, "donnee B");
    },
    function(next){
        console.log("appel du callback C");
        //fini, j'apelle next
        next(null, "donnee C");
    }],
    function(err, results){
        console.log("parallel terminé");
        //fini, j'apelle next
        console.log('nombre de résultat = ' + results.length);
        for (var i = 0; i < results.length; i++)
        {
            console.log('resultat ' + i + ' -> ' + results[i]);
        }
    });
console.log('fini');

var tab = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi','dimanche'];
var tab2 = [];
console.log('test de async.each');

async.each(tab, function(item, next){
    tab2.push(item.toUpperCase());
    next(null);
}, function(err, results){
    console.log('nombre de résultat = ' + tab2.length);
    for (var i = 0; i < tab2.length; i++)
    {
        console.log('resultat ' + i + ' -> ' + tab2[i]);
    }
}
);