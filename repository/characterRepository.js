let aws = require('aws-sdk');
let _ = require('lodash');

let configs = require('../configs');

let Character = require('../models/Character');

class CharacterRepository {
    constructor() {
        aws.config.update({ region: configs.aws.region });
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
                if (!e && d.Items) {
                    resolve(_.map(d.Items, (i) => { return new Character(i.name.S, i.username.S, i.level.S, i.race.S, i.charclass.S, i.exp.S); }));
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
                'name': {S: key}
            }
        };

        return new Promise((resolve, reject) => {
            let dynamo = new aws.DynamoDB({ apiVersion: '2012-08-10' });
            dynamo.getItem(params, (e, d) => {
                if (!e && d.Item) {
                    resolve(new Character(d.Item.name.S, d.Item.username.S, d.Item.level.S, d.Item.race.S, d.Item.charclass.S, d.Item.exp.S));
                } else {
                    reject(e, d);
                }
            });
        });
    }

    getAllByUsername(username) {
        let params = {
            TableName: this.table,
            ExpressionAttributeNames: {
                '#username': 'c_username'
            },
            ExpressionAttributeValues: {
                ':u': {S: username}
            },
            FilterExpression: '#username = :u'
        };

        return new Promise((resolve, reject) => {
            let dynamo = new aws.DynamoDB({ apiVersion: '2012-08-10' });
            dynamo.scan(params, (e, d) => {
                if (!e && d.Items) {
                    resolve(_.map(d.Items, (i) => { return new Character(i.name.S, i.username.S, i.level.S, i.race.S, i.charclass.S, i.exp.S); }));
                } else {
                    reject({ error: e, data: d });
                }
            });
        });
    }

    insert(character) {
        let params = {
            TableName: this.table,
            Item: {
                'name': {S: character.getName()},
                'c_username': {S: character.getUsername()},
                'c_level': {S: character.getLevel()},
                'c_race': {S: character.getRace()},
                'c_charclass': {S: character.getCharClass()},
                'c_exp': {S: character.getExp()}
            }
        };

        return new Promise((resolve, reject) => {
            let dynamo = new aws.DynamoDB({ apiVersion: '2012-08-10' });
            dynamo.putItem(params, (e, d) => {
                if (!e) {
                    resolve(character);
                } else {
                    reject(e, d);
                }
            });
        });
    }

    update(character) {
        let params = {
            TableName: this.table,
            Key: {
                'name': {S: character.getName()}
            },
            UpdateExpression: 'SET c_username = :username, c_level = :level, c_race = :race, c_charclass = :charclass, c_exp = :exp',
            ExpressionAttributeValues: {
                ':username': {S: character.getUsername()},
                ':level': {S: character.getLevel()},
                ':race': {S: character.getRace()},
                ':charclass': {S: character.getCharClass()},
                ':exp': {S: character.getExp()}
            }
        };

        return new Promise((resolve, reject) => {
            let dynamo = new aws.DynamoDB({ apiVersion: '2012-08-10' });
            dynamo.updateItem(params, (e, d) => {
                if (!e) {
                    resolve(character);
                } else {
                    reject(e, d);
                }
            });
        });
    }
}

module.exports = CharacterRepository;
