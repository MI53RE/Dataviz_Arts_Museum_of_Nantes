/***********************************
 ********* BirthAntDeathDateConverter
 ***********************************/

let BirtAndDeathDateConverter = {
    convert : (data, author) => {
        let dnda = {
            birthplace: '',
            birthdate: '',
            deathplace: '',
            deathdate: '',
        };
<<<<<<< HEAD
        if (data !== null) {
            const infos = data.split(' - ');
=======
        if (data.Dates_naissance_deces_artistes !== null) {
            let infos = data.Dates_naissance_deces_artiste;
            infos = infos.split(' - ');
>>>>>>> 38bc72d0db60b003f72d0a2446668a5614e56efb
            dnda.birthplace = infos[0].split(', ')[0];
            dnda.birthdate = infos[0].split(', ')[1];
            dnda.deathplace = infos[1] ? infos[1].split(', ')[0] : '';
            dnda.deathdate = infos[1] ? infos[1].split(', ')[1] : '';
        }
        author.dateOfBirth = dnda.birthdate;
        author.dateOfDeath = dnda.deathdate;
        author.placeOfBirth = dnda.birthplace;
        author.placeOfDeath = dnda.deathplace;
    }
};

module.exports = BirtAndDeathDateConverter;
