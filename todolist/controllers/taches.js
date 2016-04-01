module.exports = { // on export direct un objet

    index: function (req, res) {


        res.render('index', {});
    },

    create: function (req, res) {

        console.log("titre = " + req.body.title);
        console.log("author = " + req.body.author);
        console.log("urgence = " + req.body.urgence);

        //revenir vers la page d'accueil
        res.redirect('/');
    },

    list: function (req, res) {
        //Affichage de la vue index avec pour l'instant un viewModel Vide
        var viewModel = {
            taches: [
                {
                    uniqueId: 1,
                    title: 'tache 1',
                    author: 'alex',
                    urgence: 1
                },
                {
                    uniqueId: 2,
                    title: 'tache 2',
                    author: 'alex',
                    urgence: 3
                },
                {
                    uniqueId: 3,
                    title: 'tache 3',
                    author: 'alex',
                    urgence: 5
                }
            ],
            //layout : list pour choisir un layout différent
        };
        res.render('list', viewModel);
    }

}