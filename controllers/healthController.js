let healthService = require('../services/healthService');

class HealthController {
    constructor() {
        this.healthService = new healthService();

        this.ping = this.ping.bind(this);
        this.get = this.get.bind(this);
    }

    ping(req, res) {
        this.healthService.ping((a) => { res.json(a); });
    }

    get(req, res) {
        this.healthService.get((d) => { res.json(d); });
    }
}

module.exports = HealthController;
