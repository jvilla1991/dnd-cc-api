let nedb = require('nedb');

let ds = new nedb({ filename: './data/health.db' });

class HealthService {
    constructor() {
        this.ds = new nedb({ filename: './data/health.db', autoload: true });
        this.ds.loadDatabase((e) => {
            this.ds.insert({status: 'starting'});
        });
    }

    ping(cb) {
        cb('pong');
    }

    get(cb) {
        this.ds.find({}, (e, d) => {
            cb(d);
        })
    }
}

module.exports = HealthService;
