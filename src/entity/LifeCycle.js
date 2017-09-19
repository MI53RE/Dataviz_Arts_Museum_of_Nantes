/***********************************
 ********* Author LifeCycle
 ***********************************/

let mongoose = require('mongoose');

let LifeCycleSchema = mongoose.Schema({
    yearOfAcquisition: {type: Number},
    acquisitionType: {type: String},
    acquisitionPrecision: {type: String},
    artwork: {type: mongoose.Schema.ObjectId, ref: 'Artwork'}
});

let LifeCycle = mongoose.model('LifeCycle', LifeCycleSchema);

module.exports = LifeCycle;