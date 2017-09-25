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
            const birth = infos[0] ? infos[0].split(', ') : ['', ''];
            const death = infos[1] ? infos[1].split(', ') : ['', ''];
            dnda.birthplace = birth[0];
            dnda.birthdate = birth[birth.length - 1];
            dnda.deathplace = death ? death[0] : '';
            dnda.deathdate = death ? death[death.length - 1] : '';
        }
        author.dateOfBirth = dnda.birthdate;
        author.dateOfDeath = dnda.deathdate;
        author.placeOfBirth = dnda.birthplace;
        author.placeOfDeath = dnda.deathplace;
    }
};

module.exports = BirtAndDeathDateConverter;
