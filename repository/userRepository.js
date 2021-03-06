let aws =  require('aws-sdk');
let _ = require('lodash');

let configs = require('../configs');

let User = require('../models/User');

class UserRepository {
    constructor() {
        aws.config.update({ region: configs.aws.region });
        this.table = 'dnd-cc-d-user';
        this.searchKey = 'username';
    }

    getAll() {
        let params = {
            TableName: this.table
        };

        return new Promise((resolve, reject) => {
            let dynamo = new aws.DynamoDB({ apiVersion: '2012-08-10' });
            dynamo.scan(params, (e, d) => {
                if (!e) {
                    resolve(_.map(d.Items, (i) => { return new User(i.username.S, i.passwordhash.S); }));
                } else {
                    reject({ error: e, data: d });
                }
            });
        });
    }

    getByKey(key) {
        let params = {
            TableName: this.table,
            Key: {
                'username' : {S: key}
            },
            ProjectionExpression: 'username,passwordhash'
        };

        return new Promise((resolve, reject) => {
            let dynamo = new aws.DynamoDB({ apiVersion: '2012-08-10' });
            dynamo.getItem(params, (e, d) => {
                if (!e) {
                    resolve(new User(d.Item.username.S, d.Item.passwordhash.S));
                } else {
                    reject({ error: e, data: d });
                }
            });
        });
    }

    insert(user) {
        let params = {
            TableName: this.table,
            Item: {
                'username': {S: user.getUsername()},
                'passwordhash': {S: user.getPasswordHash()}
            }
        };

        return new Promise((resolve, reject) => {
            let dynamo = new aws.DynamoDB({ apiVersion: '2012-08-10' });
            dynamo.putItem(params, (e, d) => {
                if (!e) {
                    resolve(d);
                } else {
                    reject({ error: e, data: d });
                }
            });
        });
    }
}

module.exports = UserRepository;
