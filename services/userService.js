let _ = require('lodash');

let User = require('../models/User');
let userRepository = require('../repository/userRepository');

class UserService {
    constructor() {
        // can be removed
    }

    getAllUsers() {
        let ur = new userRepository();
        return ur.getAll();
    }

    getByUsername(params) {
        let username = params.username;

        let ur = new userRepository();
        return ur.getByKey(username);
    }

    createUser(params) {
        let username = params.username;
        let passwordhash = _.defaultTo(params.passwordhash, 'abcde');

        let ur = new userRepository();
        return ur.insert(new User(username, passwordhash));
    }
};

module.exports = UserService;
