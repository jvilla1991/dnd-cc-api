let nedb = require('nedb');
let aws = require('aws-sdk');
let _ = require('lodash');

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
        return new Promise((resolve, reject) => {
            this.ds.find({}, { passwordhash: 0 }, (e, d) => {
                if (!e) {
                    resolve(d);
                } else {
                    console.log(e);
                    reject({ error: e, data: d });
                }
            });
        });
    }

    getAllDynamoUsers() {
        return new Promise((resolve, reject) => {
            aws.config.update({ region: 'us-east-2' });
            let dynamo = new aws.DynamoDB({apiVersion: '2012-08-10'});
            let params = {
                TableName: 'User'
            };

            dynamo.scan(params, (e, d) => {
                if (!e) {
                    resolve(d);
                } else {
                    console.log(e);
                    reject({ error: e, data: d });
                }
            })
        });
    }

    getByUsername(params) {
        let username = params.username;

        return new Promise((resolve, reject) => {
            console.log('1z');
            this.ds.findOne({ username }, { passwordhash: 0 }, (e, d) => {
                if (!e) {
                    console.log('2');
                    resolve(d);
                } else {
                    console.log(e);
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
                    console.log(e);
                    reject({ error: e, data: d });
                }
            });
        });
    }
};

module.exports = UserService;
