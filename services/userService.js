let nedb = require('nedb');
let _ = require('lodash');

class UserService {
    constructor() {
        this.ds = new nedb({ filename: './data/users.db' });
        this.ds.loadDatabase((e) => {
            // load user database
            console.log('users.db ready');
            this.ds.remove({}, { multi: true }, (e, numRemoved) => {
                this.ds.insert({ username: 'user-1', passwordhash: 'abcde' });
            });
        });
    }

    getAllUsers() {
        return new Promise((resolve, reject) => {
            this.ds.find({}, { passwordhash: 0 }, (e, d) => {
                if (!e) {
                    resolve(d);
                } else {
                    reject({ error: e, data: d });
                }
            });
        });
    }

    getByUsername(params) {
        let username = params.username;

        return new Promise((resolve, reject) => {
            this.ds.findOne({ username }, { passwordhash: 0 }, (e, d) => {
                if (!e) {
                    resolve(d);
                } else {
                    reject({ error: e, data: d });
                }
            });
        });
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
                    reject({ error: e, data: d });
                }
            });
        });
    }
};

module.exports = UserService;
