/***********************************
 ********* Author Entity
 ***********************************/
const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema({
    name: {type: String, unique: true},
    dateOfBirth: {type: String},
    dateOfDeath: {type: String},
    placeOfBirth: {type: String},
    placeOfDeath: {type: String},
    Artworks: [{type: mongoose.Schema.ObjectId, ref: 'Artwork'}]
});

const Author = mongoose.model('Author', AuthorSchema);

exports.findAuthor = (name, callback) => {
    Author.findOne({name: name}, function(err, userObj){
        if(err){
            return callback(err, null);
        } else if (userObj){
            return callback(null, userObj);
        } else {
            return callback(null, null);
        }
    });
};

module.exports = Author;