let healthRepository = require('../repository/healthRepository');

class HealthService {
    constructor() {
        // can be removed
    }

    ping() {
        return Promise.resolve('pong');
    }

    get() {
        let hr = new healthRepository();
        return hr.getAll();
    }
};

module.exports = HealthService;
