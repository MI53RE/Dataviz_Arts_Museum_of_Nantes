/***********************************
 ********* Author Artwork
 ***********************************/

const mongoose = require('mongoose');

const ArtworkSchema = mongoose.Schema({
  title: { type: String },
  author: { type: mongoose.Schema.ObjectId, ref: 'Author' },
  creationDate: { type: Object },
  isExposed: { type: Boolean },
  field: { type: String },
  technique: { type: Array },
  support: { type: Array },
  width: { type: String },
  height: { type: String },
  depth: { type: String },
  diameter: { type: String },
  inventoryNumber: { type: String },
  pictureLink: { type: String },
  LifeCycle: { type: mongoose.Schema.ObjectId, ref: 'LifeCycle' }
});

const Artwork = mongoose.model('Artwork', ArtworkSchema);

Artwork.setConf = function(conf) {
  this.conf = conf;
}

Artwork.initSummary = function() {
  return {
    artworks: [],
    counter: { c: 0 },
    volume: { h: 0, w: 0, surface: 0, percent: 0 }
  }
}

Artwork.setIdx = function(artwork) {
  let idx = '';
  if (typeof artwork.creationDate === 'undefined') idx = 'unknown';
  else if (artwork.creationDate.from >= 1500 && artwork.creationDate.from <= 1599) idx = 'xvi';
  else if (artwork.creationDate.from >= 1600 && artwork.creationDate.from <= 1699) idx = 'xvii';
  else if (artwork.creationDate.from >= 1700 && artwork.creationDate.from <= 1799) idx = 'xviii';
  else if (artwork.creationDate.from >= 1800 && artwork.creationDate.from <= 1899) idx = 'xix';
  else if (artwork.creationDate.from >= 1900 && artwork.creationDate.from <= 1999) idx = 'xx';
  else idx = 'unknown';
  return idx;
}

Artwork.initData = function() {
  return {
    unknown: this.initSummary(),
    xvi: this.initSummary(),
    xvii: this.initSummary(),
    xviii: this.initSummary(),
    xix: this.initSummary(),
    xx: this.initSummary(),
    total: this.initSummary()
  };
}


// Artwork.getSummariesByCenturies = function(callback) {
//   const data = this.initData();
//   const total = this.initSummary();
//   Artwork.find((err, artworks) => {
//     if (err) throw err;
//     artworks.map((artwork) => {
//       const idx = this.setIdx(artwork);
//       data[idx].artworks.push(artwork);
//       const h = artwork.height !== 'NaN' ? parseFloat(artwork.height) : (artwork.diameter !== 'NaN' ? parseFloat(artwork.diameter) : 0);
//       const w = artwork.width !== 'NaN' ? parseFloat(artwork.width) : (artwork.diameter !== 'NaN' ? parseFloat(artwork.diameter) : 0);
//       data[idx].volume.h += h;
//       data[idx].volume.w += w;
//       data[idx].volume.surface = Math.round(Math.round(data[idx].volume.h * data[idx].volume.w) / 100) / 100;
//       total.volume.h += h;
//       total.volume.w += w;
//     });
//     total.counter.c = artworks.length;
//     for (idx in data) {
//       total.volume.surface += data[idx].volume.surface;
//     }
//     for (idx in data) {
//       data[idx].counter.c = data[idx].artworks.length;
//       data[idx].counter.percent = (data[idx].counter.c / total.counter.c) * 100;
//       data[idx].counter.height = (this.conf.graphHeight * data[idx].counter.c) / total.counter.c;
//       data[idx].counter.posY = this.conf.graphHeight - data[idx].counter.height;

//       data[idx].volume.percent = (data[idx].volume.surface / total.volume.surface) * 100;
//       data[idx].volume.height = (this.conf.graphHeight * data[idx].volume.surface) / total.volume.surface;
//       data[idx].volume.posY = this.conf.graphHeight - data[idx].volume.height;
//     }
//     callback(data);
//   });
// }

Artwork.getSummariesByCenturies = function(callback) {
  this.getCountByCenturies((dataCount) => {
    this.getVolumeByCenturies((dataVolume) => {
      callback(dataVolume);
    }, dataCount)
  });
}

Artwork.getCountByCenturies = function(callback, data) {
  data = data || this.initData();
  Artwork.find((err, artworks) => {
    if (err) throw err;
    artworks.map((artwork) => {
      const idx = this.setIdx(artwork);
      data[idx].artworks.push(artwork);
    });
    data.total.counter.c = artworks.length;
    for (idx in data) {
      if (idx !== 'total') {
        data[idx].counter.c = data[idx].artworks.length;
        data[idx].counter.percent = (data[idx].counter.c / data.total.counter.c) * 100;
        data[idx].counter.height = (this.conf.graphHeight * data[idx].counter.c) / data.total.counter.c;
        data[idx].counter.posY = this.conf.graphHeight - data[idx].counter.height;
      }
    }
    callback(data);
  });
}

Artwork.getVolumeByCenturies = function(callback, data) {
  data = data || this.initData();
  Artwork.find((err, artworks) => {
    if (err) throw err;
    artworks.map((artwork) => {
      const idx = this.setIdx(artwork);
      data[idx].artworks.push(artwork);
      const h = artwork.height !== 'NaN' ? parseFloat(artwork.height) : (artwork.diameter !== 'NaN' ? parseFloat(artwork.diameter) : 0);
      const w = artwork.width !== 'NaN' ? parseFloat(artwork.width) : (artwork.diameter !== 'NaN' ? parseFloat(artwork.diameter) : 0);
      data[idx].volume.h += h;
      data[idx].volume.w += w;
      data[idx].volume.surface = Math.round(Math.round(data[idx].volume.h * data[idx].volume.w) / 100) / 100;
      data.total.volume.h += h;
      data.total.volume.w += w;
    });
    for (idx in data) {
      if (idx !== 'total') {
        data.total.volume.surface += data[idx].volume.surface;
      }
    }
    for (idx in data) {
      if (idx !== 'total') {
        data[idx].volume.percent = (data[idx].volume.surface / data.total.volume.surface) * 100;
        data[idx].volume.height = (this.conf.graphHeight * data[idx].volume.surface) / data.total.volume.surface;
        data[idx].volume.posY = this.conf.graphHeight - data[idx].volume.height;
      }
    }
    callback(data);
  });
}

module.exports = Artwork;