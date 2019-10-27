let healthService = require('../services/healthService');

exports.ping = (req, res) => {
    res.json('pong')
}

exports.get = (req, res, ds) => {
    healthService.get(ds.health, (d) => { res.json(d) });
}
