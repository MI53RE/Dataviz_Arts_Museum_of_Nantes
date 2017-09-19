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

let Author = mongoose.model('Author', AuthorSchema);

exports.findAuthor = (name, callback) => {
    Author.findOne({name: name}, function(err, userObj){
        if(err){
            return callback(err);
        } else if (userObj){
            return callback(null,userObj);
        } else {
            return callback();
        }
    });
};

module.exports = Author;