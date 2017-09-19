/***********************************
 ********* Author Entity
 ***********************************/
let mongoose = require('mongoose');

let AuthorSchema = mongoose.Schema({
    name: {type: String, unique: true},
    dateOfBirth: {type: Number},
    dateOfDeath: {type: Number},
    placeOfBirth: {type: String},
    placeOfDeath: {type: String},
    Artworks: [{type: mongoose.Schema.ObjectId, ref: 'Artwork'}]
});

AuthorSchema.methods.findByName = (name, callback) => {
    return this.find({name: name}, callback);
};

let Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;