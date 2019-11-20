let aws = require('aws-sdk');
let _ = require('lodash');

let Character = require('../models/Character');

class CharacterRepository {
    constructor() {
        aws.config.update({ region: 'us-east-2' });
        this.table = 'dnd-cc-d-character';
        this.searchKey = 'name';
    }

    getAll() {
        let params = {
            TableName: this.table
        };

        return new Promise((resolve, reject) => {
            let dynamo = new aws.DynamoDB({ apiVersion: '2012-08-10' });
            dynamo.scan(params, (e, d) => {
                if (!e) {
                    resolve(_.map(d.Items, (i) => { return new Character(i.name.S, i.username.S, i.level.S, i.race.S, i.charclass.S, i.exp.S); }));
                } else {
                    reject({ error: e, data: d });
                }
            });
        });
    }

    getAllByUsername(username) {
        let params = {
            TableName: this.table,
            ExpressionAttributeNames: {
                '#username': 'username'
            },
            ExpressionAttributeValues: {
                ':u': {S: username}
            },
            FilterExpression: '#username = :u'
        };

        return new Promise((resolve, reject) => {
            let dynamo = new aws.DynamoDB({ apiVersion: '2012-08-10' });
            dynamo.scan(params, (e, d) => {
                if (!e) {
                    resolve(_.map(d.Items, (i) => { return new Character(i.name.S, i.username.S, i.level.S, i.race.S, i.charclass.S, i.exp.S); }));
                } else {
                    reject({ error: e, data: d });
                }
            });
        });
    }
}

module.exports = CharacterRepository;
