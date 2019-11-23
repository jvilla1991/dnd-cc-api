let userService = require('../services/userService');
let charactersService = require('../services/characterService')

class CharacterController {
    constructor() {
        this.userService = new userService();
        this.charactersService = new charactersService();

        this.getAll = this.getAll.bind(this);
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
    }

    getAll(req, res) {
        let { username } = req.params;
        
        this.charactersService.getAllByUsername(username).then((d) => {
            res.json(d);
        });
    }

    get(req, res) {
        let { username, character } = req.params;
    
        this.userService.getByUsername({username}).then((d) => {
            this.charactersService.getByName(character).then((d1) => {
                res.json(d1);
            });
        });
    }

    create(req, res) {
        let { username, character } = req.params;
        let details = req.body;

        this.charactersService.create(username, character, details).then((d1) => { res.json(d1); });
        return;
    }

    update(req, res) {
        let { username, character } = req.params;
        let details = req.body;
    
        this.charactersService.update(username, character, details).then((d) => { res.json(d); });
    }
};

module.exports = CharacterController;
