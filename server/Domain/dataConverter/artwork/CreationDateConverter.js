/***********************************
 ********* CreationDateConverter
 ***********************************/

const periods = {
    'XVIe':  ['1500', '1599'],
    'XVIIe':  ['1600', '1699'],
    'XVIIIe':  ['1700', '1799'],
    'XIXe':  ['1800', '1899'],
    'XXe': ['1900', '1999']
};

let CreationDateConverter = {
    convert: (item, artwork) => {
        for (let period in periods) {
            if (typeof item.Date_creation === 'string' && item.Date_creation.indexOf(period) !== -1) {
                return {from: periods[period][0], to: periods[period][1]};
            }
        }
        if (/s\.d\./i.test(item.Date_creation)) {
            return {from: artwork.author.dateOfBirth, to: artwork.author.dateOfDeath};
        }
        if (/[0-9]{4}?/i.test(item.Date_creation)) {
            const dates = item.Date_creation.match(/[0-9]{4}?/ig);
            return {from: dates[0] ? dates[0] : '', to: dates[1] ? dates[1] : (dates[0] ? dates[0] : '')};
        }
        return {from: '', to: ''};
    }
};

module.exports = CreationDateConverter;