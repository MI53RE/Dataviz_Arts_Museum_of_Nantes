/********************************
 * DataImporter : Where all the magic append.
 ********************************/

/********************************
 * Import Lib
 ********************************/
const diskdb = require('diskdb');

/********************************
 * Import Entity
 ********************************/
const Author = require('./../../entity/Author');
const Artwork = require('./../../entity/Artwork');
const LifeCycle = require('./../../entity/LifeCycle');

/********************************
 * Import Data Converter
 ********************************/
/** Author data Converter */
const BirthAndDeatDateConverter = require('./../dataConverter/author/BirthAndDeathDateConverter');

/** load disk DB */
diskdb.connect('./databases/', ['source', 'clean']);
let data = diskdb.source.find();

let authors = [];
let artworks = [];
let alreadyExist = false;

let DataImporter = {
    import: () => {
        /********************************
         * Persist Author
         ********************************/
        data.map((item) => {

            /** look for author in db if he didn't already exist persist him */
            Author.findOne({'name': item.Auteur}, (err, author) => {
                if (err) throw err;
                if (null == author) {
                    for (let ii = 0; ii <= authors.length; ii++) {
                        if (undefined != authors[ii] && null != authors[ii]) {
                            if (authors[ii].get('name') == item.Auteur) alreadyExist = true;
                        }
                    }
                    if (!alreadyExist) {
                        author = new Author;
                        author.name = item.Auteur;
                        BirthAndDeatDateConverter.convert(item, author);
                        Author.create(author);
                        authors.push(author);
                    }
                    alreadyExist = false;
                }
            });
        });

        /********************************
         * Persist Artworks
         ********************************/
        data.map((item) => {
            Artwork.findOne({"title": item.title}, (err, artwork) => {
                if (err) throw err;
                if (null == artwork) {
                    let artwork = new Artwork;
                    artwork.title = item.Titre;
                    Author.findOne({"name": item.Auteur}, (err, author) => {
                        if (err) throw err;
                        artwork.author = author.get('_id');
                    });
                    artwork.creationDate = ""; //TODO
                    artwork.isExposed = item.lieu_exposition == null ? false : true;
                    artwork.field = item.Domaine;
                    artwork.technique = ""; //TODO
                    artwork.inventoryNumber = item.Annee_acquisition;
                    artwork.pictureLink = item.Lien_navigart;

                    Artwork.create(artwork);

                    let lifeCycle = new LifeCycle;
                    lifeCycle.yearOfAcquisition = "";
                    lifeCycle.acquisitionType = "";
                    lifeCycle.acquisitionPrecision = "";
                    lifeCycle.artwork = artwork.get("_id");

                    LifeCycle.create(lifeCycle);

                    artwork.lifeCycle = lifeCycle.get("_id");

                    Artwork.save(artwork);
                }
                alreadyExist = false;
            })
        });
    }
};

module.exports = DataImporter;