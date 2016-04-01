var Models = require('../models'),
    async = require('async');


module.exports = {
  
  addToCart: function(req, res) {
    var sess = req.session;
    var cart = null;
    if (sess.cart) {
        cart = sess.cart;
    }
    else {
        cart = {
            products : []
        };
        sess.cart = cart;
    }
    
    Models.Product.findOne({_id : req.params.product_id}, function(err, product) {
       if (err) throw err;
       if (product.stock  > 0) {
            product.stock = product.stock - 1;
            product.save(function(err, p) {
                cart.products.push(p);
                res.json(true); 
            });
       }
       else {
           res.json(false);
       }
    });
    
  },
    
  index: function(req, res) {
    var viewModel = {};
    
    console.log(req.session);
    var sess = req.session;
    if (sess.cart) {
        viewModel.cart = sess.cart;
    }
    else {
        var cart = {
            products : []
        };
        viewModel.cart = cart;
        sess.cart = cart;
    }
    
    
    async.parallel( [
        function(next) {
            Models.Product.find( {'stock' : { $gt : 0}}, function(err, products) {
                next(err, products);
            });
        },
        function(next) {
            Models.Category.find({}, function(err, categories) {
                next(err, categories);
            });
        }
    ],
       function (err, results) {
           if (err) throw err;
           viewModel.products = results[0];
           viewModel.categories = results[1];
           for (var i = 0; i <  viewModel.products.length; i++) {
               var p = viewModel.products[i];
               for (var j = 0; j < viewModel.categories.length; j++) {
                   var c = viewModel.categories[j];
                   console.log('test :' + p.category_id + " - " + c._id);
                   // attention, les types ne correspondent pas
                   if (('' + p.category_id) == ('' + c._id)) {
                       console.log('match :' + p.category_id + " - " + c._id);
                       p.category = c;
                       break;
                   }
               }
           }
           res.render('list_products', viewModel);
       }
    );
    
  }, 
  create: function (req, res) {
      var newProduct = new Models.Product(req.body);
      newProduct.save(function(err, product){
          if (err) throw err;
          res.redirect('/products');
      })
  },
  
  remove: function (req, res) {
      Models.Product.remove({ _id : req.params.product_id}, function(err, result) {
          if (err) throw err;
          res.json(true);
      });
  }
  
};