let aws =  require('aws-sdk');
let _ = require('lodash');
let User = require('../models/User');

class userRepository {
    constructor() {
        aws.config.update({ region: 'us-east-2' });
        this.table = 'User';
    }

    getAll() {
        let params = {
            TableName: this.table
        }

        return new Promise((resolve, reject) => {
            let dynamodb = new aws.DynamoDB({ apiVersion: '2012-08-10 '});
            dynamodb.scan(params, (e, d) => {
                if (!e) {
                    resolve(_.map(d.Items, (i) => { return new User(i.username.S, i.passwordhash.S); }));
                } else {
                    reject({ error: e, data: d });
                }
            });
        });
    }
}