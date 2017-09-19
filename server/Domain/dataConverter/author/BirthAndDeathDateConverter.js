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
        if (data.Dates_naissance_deces_artistes !== null) {
            let infos = data.Dates_naissance_deces_artiste;
            infos = infos.split(' - ');
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
