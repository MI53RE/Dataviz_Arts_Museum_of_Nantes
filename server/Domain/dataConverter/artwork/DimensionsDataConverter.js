/***********************************
 ********* DimensionDataConverter
 ***********************************/

let DimensionDataConverter = {
  convert: (dimensions, artwork) => {
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
      artwork.width = parseFloat(w.replace(',', '.')) === "NaN" ? 0 : parseFloat(w.replace(',', '.'));
      artwork.height = parseFloat(h.replace(',', '.')) === "NaN" ? 0 : parseFloat(h.replace(',', '.'));
      artwork.depth = parseFloat(d.replace(',', '.')) === "NaN" ? 0 : parseFloat(d.replace(',', '.'));
      artwork.diameter = parseFloat(dia.replace(',', '.')) === "NaN" ? 0 : parseFloat(dia.replace(',', '.'));
  }
};

module.exports = DimensionDataConverter;