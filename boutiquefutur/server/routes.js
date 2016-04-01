var  express = require('express'),
     router = express.Router(),
     product = require('../controllers/product'),
     home = require('../controllers/home'),
     restprod = require('../controllers/restprod'),
     category = require('../controllers/category');
 
module.exports = function(app) {
    
    router.get('/', home.index); // page d'accueil -> redirect vers product
    
    router.get('/products', product.index);
    router.delete('/products/:product_id', product.remove);
    router.post('/products', product.create);
    router.post('/products/:product_id/addToCart', product.addToCart);
    
    router.get('/categories', category.index);
    router.delete('/categories/:category_id', category.remove);
    router.post('/categories', category.create);
    
    // routes d'una API REST 'classique'
    router.get('/restproducts', restprod.index); // -> liste des produits
    router.post('/restproducts', restprod.create); // -> creation produit
    router.put('/restproducts/:product_id', restprod.update); // -> mise a jour produit
    router.delete('/restproducts/:product_id', restprod.remove); // -> effacement produit
    
    
    app.use(router);  
};