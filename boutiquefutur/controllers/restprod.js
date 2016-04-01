var Models = require('../models'),
    async = require('async');


module.exports = {
  
    
  index: function(req, res) {
    Models.Product.find( {'stock' : { $gt : 0}}, function(err, products) {
        res.json(products);
    });    
  }, 
  create: function (req, res) {
      var newProduct = new Models.Product(req.body);
      newProduct.save(function(err, product){
          if (err) throw err;
          res.json(product);
      })
  },
  update: function(req, res) {
    var product = new Models.Product(req.body);
    product._id = req.params.product_id;
    product.save(function(err, p) {
        res.json(p);
    });
      
  },
  
  
  remove: function (req, res) {
      Models.Product.remove({ _id : req.params.product_id}, function(err, result) {
          if (err) throw err;
          res.json(true);
      });
  }
  
};