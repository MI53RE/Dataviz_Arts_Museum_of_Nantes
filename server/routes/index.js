const express = require('express');
const router = express.Router();
const db = require('diskdb');

 const Author = require('./../entity/Author');
 const Artwork = require('./../entity/Artwork');
 const LifeCycle = require('./../entity/LifeCycle');

/* GET home page. */
router.get('/', function(req, res, next) {
  const counters = {xvi: 0,xvii: 0,xviii: 0,xix: 0,xx: 0};
  Artwork.count({"creationDate.from": {"$gte": "1500", "$lt": "1599"}}, (err, count) => {if (err) throw err; return counters.xvi = count});
  Artwork.count({"creationDate.from": {"$gte": "1500", "$lt": "1599"}}, (err, count) => {if (err) throw err; return counters.xvii = count});
  Artwork.count({"creationDate.from": {"$gte": "1500", "$lt": "1599"}}, (err, count) => {if (err) throw err; return counters.xviii = count});
  Artwork.count({"creationDate.from": {"$gte": "1500", "$lt": "1599"}}, (err, count) => {if (err) throw err; return counters.xix = count});
  Artwork.count({"creationDate.from": {"$gte": "1500", "$lt": "1599"}}, (err, count) => {if (err) throw err; return counters.xx = count});
  console.log(counters);
  res.render('index', { title: 'Test', data: counters });
});
/* GET home page. */
router.get('/2', function(req, res, next) {
  const counters = {xvi: 0,xvii: 0,xviii: 0,xix: 0,xx: 0};
  Artwork.count({"creationDate.from": {"$gte": "1500", "$lt": "1599"}}, (err, count) => {if (err) throw err; return counters.xvi = count});
  Artwork.count({"creationDate.from": {"$gte": "1500", "$lt": "1599"}}, (err, count) => {if (err) throw err; return counters.xvii = count});
  Artwork.count({"creationDate.from": {"$gte": "1500", "$lt": "1599"}}, (err, count) => {if (err) throw err; return counters.xviii = count});
  Artwork.count({"creationDate.from": {"$gte": "1500", "$lt": "1599"}}, (err, count) => {if (err) throw err; return counters.xix = count});
  Artwork.count({"creationDate.from": {"$gte": "1500", "$lt": "1599"}}, (err, count) => {if (err) throw err; return counters.xx = count});
  console.log(counters);
  res.render('index2', { title: 'Test', data: counters });
});
/* GET home page. */
router.get('/3', function(req, res, next) {
  const counters = {xvi: 0,xvii: 0,xviii: 0,xix: 0,xx: 0};
  Artwork.count({"creationDate.from": {"$gte": "1500", "$lt": "1599"}}, (err, count) => {if (err) throw err; return counters.xvi = count});
  Artwork.count({"creationDate.from": {"$gte": "1500", "$lt": "1599"}}, (err, count) => {if (err) throw err; return counters.xvii = count});
  Artwork.count({"creationDate.from": {"$gte": "1500", "$lt": "1599"}}, (err, count) => {if (err) throw err; return counters.xviii = count});
  Artwork.count({"creationDate.from": {"$gte": "1500", "$lt": "1599"}}, (err, count) => {if (err) throw err; return counters.xix = count});
  Artwork.count({"creationDate.from": {"$gte": "1500", "$lt": "1599"}}, (err, count) => {if (err) throw err; return counters.xx = count});
  console.log(counters);
  res.render('index3', { title: 'Test', data: counters });
});

router.get('/regen-db', function(req, res, next) {
  db.connect('./databases/', ['source', 'clean', 'author', 'artwork']);
  const data = db.source.find();
  data.map((item) => {
    let dnda = {
      birthplace: '',
      birthdate: '',
      deathplace: '',
      deathdate: '',
    };
    if (item.Dates_naissance_deces_artiste !== null) {
      const infos = item.Dates_naissance_deces_artiste.split(' - ');
      dnda.birthplace = infos[0].split(', ')[0];
      dnda.birthdate = infos[0].split(', ')[1];
      dnda.deathplace = infos[1] ? infos[1].split(', ')[0] : '';
      dnda.deathdate = infos[1] ? infos[1].split(', ')[1] : '';
    }
    item = Object.assign(item, {
      _artist: {
        name: item.Auteur,
        birthplace: dnda.birthplace,
        birthdate: dnda.birthdate,
        deathplace: dnda.deathplace,
        deathdate: dnda.deathdate
      }
    });


    const cleanItem =  Object.assign({}, {
      artist: item._artist,
      obtention: {
        year: item.Annee_acquisition,
        type: item.Type_acquisition
      },
      url: item.Lien_Navigart,
      inventory_number: item.No_inventaire,
      title: item.Titre,
      field: item.Domaine,
      dimensions: getDimensions(item.Dimensions),
      techniques: getTechnique(item.Technique),
      supports: getSupport(item.Technique),
      date_creation: filterPeriod(item)
    });
    db.clean.save(cleanItem);
  });
  res.render('index', { title: 'Test', data: data });
});

function getDimensions(dimensions) {
  let h = '', w = '', d = '', dia = '';
  if (dimensions) {
    const splitX = dimensions.split(' x ');
    const split1 = splitX[0] ? splitX[0].split(' ') : ['', '', '', ''];
    const split2 = splitX[1] ? splitX[1].split(' ') : ['', '', '', ''];
    const split3 = splitX[2] ? splitX[2].split(' ') : ['', '', '', ''];
    switch (split1[0]) {
    case 'hauteur:':
      h = split1[1];
      break;
    case 'diamètre:':
      dia = split1[1];
      break;
    case 'profondeur:':
      d = split1[1];
      break;
    default:
      h = split1[0];
      break;
    }
    switch (split2[0]) {
    case 'hauteur:':
      h = split2[1];
      break;
    case 'diamètre:':
      dia = split2[1];
      break;
    case 'profondeur:':
      d = split2[1];
      break;
    default:
      w = split2[0];
      break;
    }
    switch (split3[0]) {
    case 'hauteur:':
      h = split3[1];
      break;
    case 'diamètre:':
      dia = split3[1];
      break;
    case 'profondeur:':
      d = split3[1];
      break;
    default:
      d = split3[0];
      break;
    }
  }
  return {
    height: h,
    width: w,
    depth: d,
    diameter: dia 
  };
}
const periods = {
  'XVIe':  ['1500', '1599'],
  'XVIIe':  ['1600', '1699'],
  'XVIIIe':  ['1700', '1799'],
  'XIXe':  ['1800', '1899'],
  'XXe': ['1900', '1999']
};

const techniques = [
  'pierre noire',
  'craie',
  'sanguine',
  'mine de plomb',
  'fusain',
  'plume',
  'encre',
  'gouache',
  'huile',
  'aquarelle',
  'pastel',
  'eau-forte',
  'eau forte',
  'lithographie',
  'estampe',
  'crayon',
  'lavis',
  'draperie',
  'mise au carreau',
  'rehaussé',
  'frottis',
  'mine graphite',
  'gravure',
  'burin',
  'cannif',
  'tirage',
  'epreuve',
  'illustration',
];

const supports = [
  'toile',
  'bois',
  'bronze',
  'plâtre',
  'platre',
  'marbre',
  'papier contrecollé sur papier',
  'papier',
  'calque',
  'pierre',
  'carton',
  'matrice cuivre',
  'carnet'
];

function filterPeriod(item) {
  for (let period in periods) {
    if (typeof item.Date_creation === 'string' && item.Date_creation.indexOf(period) !== -1) {
      return {from: periods[period][0], to: periods[period][1]};
    }
  }
  if (/s\.d\./i.test(item.Date_creation)) {
    return {from: item._artist.birthdate, to: item._artist.deathdate};
  }
  if (/[0-9]{4}?/i.test(item.Date_creation)) {
    const dates = item.Date_creation.match(/[0-9]{4}?/ig);
    return {from: dates[0] ? dates[0] : '', to: dates[1] ? dates[1] : (dates[0] ? dates[0] : '')};
  }
  return {from: '', to: ''};
}

function getTechnique(itemTechnique) {
  const array = [];
  techniques.map((technique) => {
    if (itemTechnique && itemTechnique.toLowerCase().indexOf(technique) !== -1) {
      array.push(technique);
    }
  });
  return array;
}

function getSupport(itemTechnique) {
  const array = [];
  supports.map((support) => {
    if (itemTechnique && itemTechnique.toLowerCase().indexOf(support) !== -1) {
      array.push(support);
    }
  });
  return array;
}

module.exports = router;
