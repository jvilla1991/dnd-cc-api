let aws = require('aws-sdk');
let _ = require('lodash');

let configs = require('../configs');

let Health = require('../models/Health');

class HealthRepository {
    constructor() {
        aws.config.update({ region: configs.aws.region });
        this.table = 'dnd-cc-d-health';
        this.searchKey = 'session'
    }

    getAll() {
        let params = {
            TableName: this.table
        };

        return new Promise((resolve, reject) => {
            let dynamo = new aws.DynamoDB({ apiVersion: '2012-08-10' });
            dynamo.scan(params, (e, d) => {
                if (!e) {
                    resolve(_.map(d.Items, (i) => { return new Health(i.session.S, i.app.S, i.status.S, i.message.S) }));
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
                'session': {S: key}
            },
            ProjectionExpression: 'session,app,status,message'
        };

        return new Promise((resolve, reject) => {
            let dynamo = new aws.DynamoDB({ apiVersion: '2012-08-10' });
            dynamo.getItem(params, (e, d) => {
                if (!e) {
                    resolve(new Health(d.Item.session.S, d.Item.app.S, d.Item.status.S, d.Item.message.S));
                } else {
                    reject({ error: e, data: d });
                }
            });
        });
    }

    insert(health) {
        let params = {
            TableName: this.table,
            Item: {
                'session': {S: health.getSession()},
                'app': {S: health.getApp()},
                'status': {S: health.getStatus()},
                'message': {S: health.getMessage()}
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

    deleteAll() {
        let params = {
            TableName: this.table
        }

        return new Promise((resolve, reject) => {
            let dynamo = new aws.DynamoDB({ apiVersion: '2012-08-10' });
            this.getAll().then((d) => {
                _.forEach(d, (i) => {
                    dynamo.deleteItem({
                        TableName: this.table,
                        Key: {
                            'session': {S: i.session}
                        }
                    }, (e, d) => {
                        if (e) {
                            reject({ error : e, data: d });
                        }
                    });
                });

                resolve('cleared health');
            });
        });
    }
}

module.exports = HealthRepository;
