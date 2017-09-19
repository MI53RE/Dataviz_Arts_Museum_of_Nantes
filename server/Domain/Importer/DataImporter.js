/********************************
 * DataImporter : Where all the magic append.
 ********************************/

/********************************
 * Import Lib
 ********************************/
const db = require('diskdb');
const mongo = require('mongodb');

/********************************
 * Import Entity
 ********************************/
const Author = require('./../../entity/Author');

/********************************
 * Import Data Converter
 ********************************/
/** Author data Converter */
const BirthAndDeatDateConverter = require('./../dataConverter/author/BirthAndDeathDateConverter');

/** load disk DB */
db.connect('./databases/', ['source', 'clean']);
const data = db.source.find();

/********************************
 * Persist User
 ********************************/
data.map((item) => {
    /** look for author in db if he didn't already exist persist him */
    Author.findByName(item.Auteur, (err, author) => {
        if (err) return err.message;
        if (null != author) {
            return false;
        } else {
            author = new Author;
            author.name = item.Author;
            BirthAndDeatDateConverter.convert(item, author);
            author.create();
        }
    })
});

module.exports = DataImporter;