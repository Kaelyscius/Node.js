var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/mongotest');
mongoose.connection.on('open', function () {
    console.log("connected to mongodb");

    // Un schéma mongoose définie la structure d'un objet javascript à stocker dans mongodb
    // C'est a dire ses champs, leurs types et diverses contraintes sur leurs valeurs
    var CompteUtilisateur = new Schema({
        "username": {type: String},
        "date_creation": {type: Date, default: Date.now},
        "email": {type: String},
        "actif": {type: Boolean, default: false},
        "age": {type: Number, required: true, min: 0, max: 130},

    });

    // Ajout de fonction custom pour la recherche
    CompteUtilisateur.static.findOldest = function(callback){
        this.find({}, {}, {sort: {'age': -1}}, callback);
    }

    // A partir d'un schéma nous pouvons obtenir un objet model qui permettra de gérer
    // La persistance des objets spécifié par le schéma.
    // Nous indiquons aussi le nom de la collection dans la base mongodb
    var CompteModel = mongoose.model('CompteUtilisateur', CompteUtilisateur);


    var newUser = new CompteModel(
        {
            "username": "bob",
            "email": "bob@eponge.com",
            "age": (Math.random() * 30) + 10
        });
    console.log(newUser.username);
    console.log(newUser.date_creation);
    console.log(newUser.email);
    console.log(newUser.actif);
    console.log('---------------------------------------------------------------');

    //Insertion de l'objet en base
    newUser.save(function (err, user) {
        if (err) throw err;
        console.log('insertion réussie'); //clé automatique mongodb
        console.log(user._id); //clé automatique mongodb
        console.log(user.username);
        console.log(user.date_creation);
        console.log(user.age);
        console.log(user.email);
        console.log(user.actif);

        console.log("requetage base");


        //$gt = -> strictement supérieur (greater than)
        //$lte -> inférieur ou égale (Lesser than or equals)

        /* CompteModel.find({age: {$gt: 15, $lte: 30}}, function (err, comptes) {
         if (err) throw err;
         console.log('nombre de compte : ' + comptes.length);

         for (var i = 0; i < comptes.length; i++) {
         console.log(comptes[i]._id + " ; " + comptes[i].date_creation + " ; " + comptes[i].username + " ; " + comptes[i].age);
         }
         });*/

        //Le deuxieme paramettre si ce n'est pas un callback, détermine les champs à renvoyer.
        // Au lieu de renvoyer la totalité de l'objet.
        //_id es envoyé par défaut, pour ne pas l'avoir il faut indiquer avec _id : false
        /*CompteModel.find(
            {age: {$gt: 15, $lte: 30}},
            {age: true, date_creation: true},
            function (err, comptes) {
                if (err) throw err;
                console.log('nombre de compte : ' + comptes.length);

                for (var i = 0; i < comptes.length; i++) {
                    console.log(comptes[i].date_creation + " ; " + comptes[i].age);
                }
            }
        );*/
        // Cette fois ci on utilise un troisieme paramettre pour trier et limiter les objet renvoyés
        CompteModel.find(
            {age: {$gt: 15, $lte: 30}},
            {age: true, date_creation: true},
            {limit: 5, sort :{ 'age' : 1}},
            function (err, comptes) {
                if (err) throw err;
                console.log('nombre de compte : ' + comptes.length);

                for (var i = 0; i < comptes.length; i++) {
                    console.log(comptes[i].date_creation + " ; " + comptes[i].age);
                }
            }
        );

        CompteModel.findOldest(function(err, results){
            for (var i = 0; i < results.length; i++) {
                console.log(results[i].username)
                console.log(results[i].date_creation + " ; " + results[i].age);
            }
        })

    });
});