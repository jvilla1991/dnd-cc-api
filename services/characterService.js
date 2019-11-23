let characterRepository = require('../repository/characterRepository');

let Character = require('../models/Character');

class CharacterService {
    constructor() {
        // can be removed
    }

    getAllByUsername(username) {
        let cr = new characterRepository();
        return cr.getAllByUsername(username);
    }

    getByName(name) {
        let cr = new characterRepository();
        return cr.getByKey(name);
    }

    create(username, name, details) {
        let char = new Character(username, name, details.level, details.race, details.charclass, details.exp);

        let cr = new characterRepository();
        return cr.insert(char);
    }

    /*updateDetails(params, cb) {
        return new Promise((resolve, reject) => {
            this.charDetailsDs.update({_id: params.id}, params.cD, (e, d) => {
                if (!e) {
                    resolve(d);
                } else {
                    reject({ error: e, data: d });
                }
            });
        });
    }*/
};

module.exports = CharacterService;
