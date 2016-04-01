var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path');

var ImageSchema = new Schema({
    title: {type: String},
    discription : {type : String},
    filename : {type: String},
    views : {type : Number, default : 0},
    likes : {type : Number, default : 0},
    timestamp : {type : Date, default:  Date.now}

});

ImageSchema.virtual('uniqueId')
    .get(function () {
        //Retourne le nom du fichier en enlevant l'extention de fichier
       return this.filename.replace(path.extname(this.filename),'');
    });

module.exports = mongoose.model('ImageSchema', ImageSchema);
/*
module.exports = {
    images: [
        {
            uniqueId:1,
            title:'sample image 1',
            description:'',
            filename:'sample1.jpg',
            views : 0,
            likes : 0,
            timestamp : Date.now()
        },
        {
            uniqueId:2,
            title:'sample image 2',
            description:'',
            filename:'sample2.jpg',
            views : 0,
            likes : 0,
            timestamp : Date.now()
        },
        {
            uniqueId:3,
            title:'sample image 3',
            description:'',
            filename:'sample3.jpg',
            views : 0,
            likes : 0,
            timestamp : Date.now()
        }
    ]

};*/