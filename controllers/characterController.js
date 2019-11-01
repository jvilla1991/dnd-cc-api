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
        this.userService.getByUsername({username}, (d) => {
            this.charactersService.getAllByUserId({userid: d._id}, (d1) => { res.json(d1); });
        });
    }

    get(req, res) {
        let { username, character } = req.params;
    
        this.userService.getByUsername({username}, (d) => {
            this.charactersService.getByName({userid: d._id, name: character}, (d1) => {
                this.charactersService.getDetails({characterid: d1._id}, (d2) => {
                    let c = {
                        character: d1,
                        characterDetails: d2
                    }
    
                    res.json(c);
                });
                return;
            });
            return;
        });
    }

    create(req, res) {
        let { username, character } = req.params;
        let { details } = req.body;
        
        this.userService.getByUsername({username}, (d) => {
            let params = {
                userid: d._id,
                name: character,
                details
            };
            this.charactersService.create(params, (d1) => { res.json({d, d1}); });
        });
        return;
    }

    update(req, res) {
        let { username, character } = req.params;
        let { details } = req.body;
    
        this.userService.getByUsername({username}, (d) => {
            this.charactersService.getByName({userid: d._id, name: character}, (d1) => {
                this.charactersService.getDetails({characterid: d1._id}, (d2) => {
                    let cD = {
                        characterid: d1._id,
                        ...details
                    };
                    this.charactersService.updateDetails({id: d2._id, cD}, (d3) => {
                        res.json(d3);
                    });
                });
            });
        });
    }
};

module.exports = CharacterController;
