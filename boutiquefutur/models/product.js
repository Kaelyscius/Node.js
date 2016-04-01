var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId; //type cle mongodb 

var ProductSchema = new Schema({
   nom:       {type: String},
   prix:        {type: Number, min : 0},
   poids:    {type: Number, min : 0},
   stock:     {type: Number, min : 0},
   timestamp:   {type: Date, default: Date.now},
   category_id:    {type: ObjectId} 
});

ProductSchema.virtual('category')
    .set(function(category) {
        this._category = category;
    })
    .get(function() {
        return this._category;
    });

module.exports = mongoose.model('product', ProductSchema);
