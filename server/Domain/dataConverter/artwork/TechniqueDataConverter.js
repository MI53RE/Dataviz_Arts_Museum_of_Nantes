/***********************************
 ********* TechniqueDataConverter
 ***********************************/

const techniquesRef = [
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

let TechniqueDataConverter = {
    convert: (itemTechnique, artwork) => {
        const techniques = [];
        techniquesRef.map((technique) => {
            if (itemTechnique && itemTechnique.toLowerCase().indexOf(technique) !== -1) {
                techniques.push(technique);
            }
        });
        artwork.technique = techniques;
    }
};

module.exports = TechniqueDataConverter;