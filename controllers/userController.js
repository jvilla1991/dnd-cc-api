let userService = require('../services/userService');

class UserController {
    constructor() {
        this.userService = new userService();

        this.get = this.get.bind(this);
        this.getByUsername = this.getByUsername.bind(this);
        this.create = this.create.bind(this);
    }

    get(req, res) {
        this.userService.getAllDynamoUsers().then((d) => { res.json(d); });
    }

    getByUsername(req, res) {
        let { username } = req.params;
        this.userService.getByUsername({username}).then((d) => { res.json(d) });
    }

    create(req, res) {
        let { username } = req.params;
        let { passwordhash } = req.body;
    
        this.userService.createUser({username, passwordhash}).then((d) => {
            res.json(d);
        });
    }
};

module.exports = UserController;
