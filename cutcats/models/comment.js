var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    ObjectId = Schema.ObjectId; // Type clé mongodb

var CommentSchema = new Schema({
    email :     {type : String},
    name :      {type : String},
    gravatar :  {type : String},
    comment :     {type : String},
    timestamp:  {type: Date, default : Date.now},
    image_id:   {type: ObjectId}
});

CommentSchema.virtual('image')
    .set(function (image) {
       this._image = image;
    })
    .get(function(){
        return this._image;
    });

module.exports = mongoose.model('Comment', CommentSchema);

/*module.exports = {
    comment: [
        {
            uniqueId:1,
            image_id: 1,
            email : 'non@test.fr',
            name : 'nono',
            gravatar: '',
            comment: 'HEEEEYY NICE',
            timestamp: Date.now()
        },
        {
            uniqueId:2,
            image_id: 1,
            email : 'non2@test.fr',
            name : 'nono2',
            gravatar: '',
            comment: 'HEEEEYY NICE xD',
            timestamp: Date.now()

        },
        {
            uniqueId:3,
            image_id: 1,
            email : 'non3@test.fr',
            name : 'nono3',
            gravatar: '',
            comment: 'HEEEEYY NICE DDDD',
            timestamp: Date.now()
        }
    ]
};*/