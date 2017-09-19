/***********************************
 ********* SupportDataConverter
 ***********************************/

const supportRef = [
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

let SupportDataConverter = {
    convert: (itemTechnique, artwork) => {
        const supports = [];
        supportRef.map((support) => {
            if (itemTechnique && itemTechnique.toLowerCase().indexOf(support) !== -1) {
                supports.push(support);
            }
        });
        artwork.support = supports;
    }
};

module.exports = SupportDataConverter;