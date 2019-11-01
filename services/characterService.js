let nedb = require('nedb');

class CharacterService {
    constructor() {
        this.charDs = new nedb({ filename: './data/characters.db' });
        this.charDetailsDs = new nedb({ filename: './data/characterDetails.db' });
        this.charDs.loadDatabase((e) => {
            // load character database
            console.log('characters.db ready');
        });
        this.charDetailsDs.loadDatabase((e) => {
            // load character details database
            console.log('characterDetails.db ready');
        });
    }

    getAllByUserId(params, cb) {
        this.charDs.find({ userid: params.userid }, (e, d) => {
            if (e) {
                res.json('error in character');
                return;
            }
            cb(d);
        });
    }

    getByName(params, cb) {
        this.charDs.findOne({userid: params.userid, name: params.name}, (e, d) => { cb(d); });
    }

    getDetails(params, cb) {
        this.charDetailsDs.findOne({characterid: params.characterid}, (e, d) => { cb(d) });
    }

    create(params, cb) {
        let c = {
            userid: params.userid,
            name: params.name
        };
        this.charDs.insert(c, (e, d) => {
            let cD = {
                characterid: d._id,
                ...params.details
            }
            this.charDetailsDs.insert(cD, (e, d1) => { cb(d1); });
        });
    }

    updateDetails(params, cb) {
        this.charDetailsDs.update({_id: params.id}, params.cD, (e, d) => { cb(d); });
    }
};

module.exports = CharacterService;
