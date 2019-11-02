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
        this.userService.getByUsername({username}).then((d) => {
            this.charactersService.getAllByUserId({userid: d._id}).then((d1) => { res.json(d1); });
        });
    }

    get(req, res) {
        let { username, character } = req.params;
    
        this.userService.getByUsername({username}).then((d) => {
            this.charactersService.getByName({userid: d._id, name: character}).then((d1) => {
                this.charactersService.getDetails({characterid: d1._id}).then((d2) => {
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
        
        this.userService.getByUsername({username}).then((d) => {
            let params = {
                userid: d._id,
                name: character,
                details
            };
            this.charactersService.create(params).then((d1) => { res.json({d, d1}); });
        });
        return;
    }

    update(req, res) {
        let { username, character } = req.params;
        let { details } = req.body;
    
        this.userService.getByUsername({username}).then((d) => {
            this.charactersService.getByName({userid: d._id, name: character}).then((d1) => {
                this.charactersService.getDetails({characterid: d1._id}).then((d2) => {
                    let cD = {
                        characterid: d1._id,
                        ...details
                    };
                    this.charactersService.updateDetails({id: d2._id, cD}).then((d3) => {
                        res.json(d3);
                    });
                });
            });
        });
    }
};

module.exports = CharacterController;
