/***********************************
 ********* Author Artwork
 ***********************************/

const mongoose = require('mongoose');

const ArtworkSchema = mongoose.Schema({
    title: {type: String},
    author: {type: mongoose.Schema.ObjectId, ref: 'Author'},
    creationDate: {type: Object},
    isExposed: {type: Boolean},
    field: {type: String},
    technique: {type: Array},
    support: {type: Array},
    width: {type: String},
    height: {type: String},
    depth: {type: String},
    diameter: {type: String},
    inventoryNumber: {type: String},
    pictureLink: {type: String},
    LifeCycle: {type: mongoose.Schema.ObjectId, ref: 'LifeCycle'}
});

const Artwork = mongoose.model('Artwork', ArtworkSchema);

module.exports = Artwork;