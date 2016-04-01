var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
   libelle:       {type : String}
 });

            
module.exports = mongoose.model('category', CategorySchema);
