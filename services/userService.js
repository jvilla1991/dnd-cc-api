let nedb = require('nedb');
let _ = require('lodash');

let userRepository = require('../repository/userRepository');

class UserService {
    constructor() {
        this.ds = new nedb({ filename: './data/users.db' });
        this.ds.loadDatabase((e) => {
            // load user database
            this.ds.remove({}, { multi: true }, (e, numRemoved) => {
                // this.ds.insert({ username: 'user-1', passwordhash: 'abcde' });
                console.log('users.db ready');
            });
        });
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
        return new Promise((resolve, reject) => {
            this.ds.insert({
                username: params.username,
                passwordhash: _.defaultTo(params.passwordhash, '')
            }, (e, d) => {
                if (!e) {
                    resolve(d);
                } else {
                    console.log(e);
                    reject({ error: e, data: d });
                }
            });
        });
    }
};

module.exports = UserService;
