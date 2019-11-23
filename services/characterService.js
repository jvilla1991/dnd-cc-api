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

    update(username, name, details) {
        let char = new Character(username, name, details.level, details.race, details.charclass, details.exp);

        let cr = new characterRepository();
        return cr.update(char);
    }
};

module.exports = CharacterService;
