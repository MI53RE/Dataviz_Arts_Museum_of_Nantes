/***********************************
 ********* Author Artwork
 ***********************************/

let mongoose = require('mongoose');

let ArtworkSchema = mongoose.Schema({
    title: {type: String},
    author: {type: mongoose.Schema.ObjectId, ref: 'Author'},
    creationDate: {type: Number},
    isExposed: {type: Boolean},
    field: {type: String},
    technique: {type: String},
    width: {type: Number},
    height: {type: Number},
    depth: {type: Number},
    inventoryNumber: {type: Number},
    pictureLink: {type: String},
    LifeCycle: {type: mongoose.Schema.ObjectId, ref: 'LifeCycle'}
});

let Artwork = mongoose.model('Artwork', ArtworkSchema);

module.exports = Artwork;