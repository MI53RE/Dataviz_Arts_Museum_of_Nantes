/***********************************
 ********* Author Entity
 ***********************************/

let mongoose = require('mongoose');

let AuthorSchema = mongoose.Schema({
    name: {type: String},
    dateOfBirth: {type: Number},
    dateOfDeath: {type: Number},
    placeOfBirth: {type: String},
    placeOfDeath: {type: String},
    Artworks: [{type: mongoose.Schema.ObjectId, ref: 'Artwork'}]
});

let Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;