let nedb = require('nedb');
let _ = require('lodash');

class UserService {
    constructor() {
        this.ds = new nedb({ filename: './data/users.db' });
        this.ds.loadDatabase((e) => {
            // load user database
        });
    }

    getAllUsers(cb) {
        this.ds.find({}, { passwordhash: 0 }, (e, d) => { cb(d); });
    }

    getByUsername(params, cb) {
        this.ds.findOne({ username: params.username }, { passwordhash: 0 }, (e, d) => { cb(d); });
    }

    createUser(params, cb) {
        this.ds.insert({
            username: params.username,
            passwordhash: _.defaultTo(params.passwordhash, '')
        }, (e, d) => {
            cb(d);
        });
    }
}

module.exports = UserService;
