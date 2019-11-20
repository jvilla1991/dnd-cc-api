let nedb = require('nedb');
let characterRepository = require('../repository/characterRepository');

class CharacterService {
    constructor() {
        this.charDs = new nedb({ filename: './data/characters.db' });
        this.charDetailsDs = new nedb({ filename: './data/characterDetails.db' });
        this.charDs.loadDatabase((e) => {
            // load character database
            console.log('characters.db ready');
            this.charDs.remove({}, { multi: true }, (e, numRemoved) => { });
        });
        this.charDetailsDs.loadDatabase((e) => {
            // load character details database
            console.log('characterDetails.db ready');
            this.charDetailsDs.remove({}, { multi: true }, (e, numRemoved) => { });
        });
    }

    getAllByUsername(username) {
        let cr = new characterRepository();
        return cr.getAllByUsername(username);
    }

    getAllByUserId(params) {
        return new Promise((resolve, reject) => {
            this.charDs.find({ userid: params.userid }, (e, d) => {
                if (!e) {
                    resolve(d);
                } else {
                    reject({ error: e, data: d });
                }
            });
        });
    }

    getByName(params) {
        return new Promise((resolve, reject) => {
            this.charDs.findOne({userid: params.userid, name: params.name}, (e, d) => {
                if (!e) {
                    resolve(d);
                } else {
                    reject({ error: e, data: d });
                }
            });
        });
    }

    getDetails(params) {
        return new Promise((resolve, reject) => {
            this.charDetailsDs.findOne({characterid: params.characterid}, (e, d) => {
                if (!e) {
                    resolve(d);
                } else {
                    reject({ error: e, data: d });
                }
            });
        });
    }

    create(params) {
        let c = {
            userid: params.userid,
            name: params.name
        };

        return new Promise((resolve, reject) => {
            this.charDs.insert(c, (e, d) => {
                if (e) {
                    reject({ error: e, data: d });
                    return;
                }
                let cD = {
                    characterid: d._id,
                    ...params.details
                }
                this.charDetailsDs.insert(cD, (e, d1) => {
                    if (e) {
                        reject({ error: e, data: d });
                    } else {
                        resolve(d1);
                    }
                });
            });
        });
    }

    updateDetails(params, cb) {
        return new Promise((resolve, reject) => {
            this.charDetailsDs.update({_id: params.id}, params.cD, (e, d) => {
                if (!e) {
                    resolve(d);
                } else {
                    reject({ error: e, data: d });
                }
            });
        });
    }
};

module.exports = CharacterService;
