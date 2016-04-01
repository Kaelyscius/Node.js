var Models = require('../models');


module.exports = {
    
  index: function(req, res) {
    var viewModel = {};
    Models.Category.find({}, function(err, categories) {
        if (err) throw err;
        viewModel.categories = categories;
        res.render('list_categories', viewModel);
    });   
  }, 
  create: function (req, res) {
      var newCategorie = new Models.Category(req.body);
      newCategorie.save(function(err, result) {
          if (err) throw err;
          res.redirect('/categories');
      })
  },
  
  remove: function (req, res) {
      Models.Category.remove({ _id : req.params.category_id}, function(err, result) {
          if (err) throw err;
         Models.Product.remove({category_id: req.params.category_id}, function(err, result) {
             if (err) throw err;
             res.json(true);
         });
      });
  }
 
  
};