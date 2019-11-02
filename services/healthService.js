let nedb = require('nedb');

class HealthService {
    constructor() {
        this.ds = new nedb({ filename: './data/health.db', autoload: true });
        this.ds.loadDatabase((e) => {
            this.ds.insert({status: 'starting'});
        });
    }

    ping() {
        return Promise.resolve('pong');
    }

    get() {
        return new Promise((resolve, reject) => {
            this.ds.find({}, (e, d) => {
                if (!e) {
                    resolve(d);
                } else {
                    reject({ error: e, data: d });
                }
            });
        });
    }
};

module.exports = HealthService;
