/***********************************
 ********* Author LifeCycle
 ***********************************/

const mongoose = require('mongoose');

const LifeCycleSchema = mongoose.Schema({
    yearOfAcquisition: {type: Number},
    acquisitionType: {type: String},
    artwork: {type: mongoose.Schema.ObjectId, ref: 'Artwork'}
});

const LifeCycle = mongoose.model('LifeCycle', LifeCycleSchema);

module.exports = LifeCycle;