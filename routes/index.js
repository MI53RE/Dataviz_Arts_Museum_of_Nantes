const express = require('express');
const router = express.Router();
const db = require('diskdb');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.connect('./databases/', ['source', 'clean']);
  const data = db.source.find();
  data.map((item) => {
    const dimensions = item.Dimensions ? item.Dimensions.split(' x ') : ['', '', ''];
    const date = {from: '', to: ''};
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

    filterPeriod('s.d.', item.Date_creation, () => {
      date.from = dnda.birthdate;
      date.to = dnda.deathdate;
    });
    filterPeriod('XVIe', item.Date_creation, () => {
      date.from = '1500';
      date.to = '1599';
    });
    filterPeriod('XVIIe', item.Date_creation, () => {
      date.from = '1600';
      date.to = '1699';
    });
    filterPeriod('XVIIIe', item.Date_creation, () => {
      date.from = '1700';
      date.to = '1799';
    });
    filterPeriod('XIXe', item.Date_creation, () => {
      date.from = '1800';
      date.to = '1899';
    });
    filterPeriod('XXe', item.Date_creation, () => {
      date.from = '1900';
      date.to = '1999';
    });


    return Object.assign(item, {
      _dimensions: {
        height: typeof dimensions[0] === 'string' ? dimensions[0].split(' ')[0] : '',
        width: typeof dimensions[1] === 'string' ? dimensions[1].split(' ')[0] : '',
        depth: typeof dimensions[2] === 'string' ? dimensions[2].split(' ')[0] : ''
      },
      _date_creation: {
        from: date.from,
        to: date.to
      }
    });
    // 'Annee_acquisition': item.
    // 'Auteur':
    // 'Date_creation':
    // 'Dates_naissance_deces_artiste':
    // 'Dimensions':
    // 'Domaine':
    // 'Lien_Navigart':
    // 'Lieu_exposition':
    // 'No_inventaire':
    // 'Précisions_acquisition':
    // 'Technique':
    // 'Titre':
    // 'Type_acquisition':
  });
  db.clean.save(data);
  res.render('index', { title: 'Express', data: data });
});

function filterPeriod(item) {
  const periods = {
    'XVIe':  ['1500', '1599'],
    'XVIIe':  ['1600', '1699'],
    'XVIIIe':  ['1700', '1799'],
    'XIXe':  ['1800', '1899'],
    'XXe': ['1900', '1999']
  };
  for (period in periods) {
    let regex = new RegExp('/' + period + '/i');
    if (regex.test(item.Date_creation)) {
      return {from: periods[period][0], to: periods[period][1]};
    }
  }
  if (/s\.d\./i.test(item.Date_creation)) {
    return {from: item._artist.birthdate, to: item._artist.deathdate};
  }

  return false;
}

module.exports = router;
