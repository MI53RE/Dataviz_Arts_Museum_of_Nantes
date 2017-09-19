/********************************
 * DataImporter : Where all the magic append.
 ********************************/

/********************************
 * Import Lib
 ********************************/
<<<<<<< HEAD
const db = require('diskdb');
const mongo = require('mongodb');
=======
const diskdb = require('diskdb');
>>>>>>> 38bc72d0db60b003f72d0a2446668a5614e56efb

/********************************
 * Import Entity
 ********************************/
const Author = require('./../../entity/Author');
<<<<<<< HEAD
=======
const Artwork = require('./../../entity/Artwork');
const LifeCycle = require('./../../entity/LifeCycle');
>>>>>>> 38bc72d0db60b003f72d0a2446668a5614e56efb

/********************************
 * Import Data Converter
 ********************************/
/** Author data Converter */
const BirthAndDeatDateConverter = require('./../dataConverter/author/BirthAndDeathDateConverter');
/** Artwork data Converter */
const DimensionDataConverter = require('./../dataConverter/artwork/DimensionsDataConverter');
const TechniqueDataConverter = require('./../dataConverter/artwork/TechniqueDataConverter');
const SupportDataConverter = require('./../dataConverter/artwork/SupportDataConverter');
const CreationDateConverter = require('./../dataConverter/artwork/CreationDateConverter');

/** load disk DB */
<<<<<<< HEAD
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
=======
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

            Artwork.findOne({"pictureLink": item.Lien_navigart}, (err, artwork) => {
                if (err) throw err;
                if (null == artwork) {
                    let artwork = new Artwork;
                    artwork.title = item.Titre;
                    artwork.author = Author.findOne({"name": item.Auteur}).exec().then(()=>{return author.get('_id')});
                    CreationDateConverter.convert(item, artwork);
                    artwork.isExposed = item.lieu_exposition == null ? false : true;
                    artwork.field = item.Domaine;
                    TechniqueDataConverter.convert(item.Technique, artwork);
                    SupportDataConverter.convert(item.Technique, artwork);
                    artwork.inventoryNumber = item.No_inventaire;
                    artwork.pictureLink = item.Lien_navigart;
                    DimensionDataConverter.convert(item.Dimensions, artwork);

                    Artwork.create(artwork);

                    let lifeCycle = new LifeCycle;
                    lifeCycle.yearOfAcquisition = item.Annee_acquisition;
                    lifeCycle.acquisitionType = item.Type_acquisition;
                    lifeCycle.artwork = artwork.get("_id");

                    LifeCycle.create(lifeCycle);

                    artwork.lifeCycle = lifeCycle.get("_id");

                    artwork.save();
                }
                alreadyExist = false;
            })
        });
    }
};
>>>>>>> 38bc72d0db60b003f72d0a2446668a5614e56efb

module.exports = DataImporter;