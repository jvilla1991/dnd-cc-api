let healthService = require('../services/healthService');

exports.ping = (req, res) => {
    res.json('pong')
}

exports.get = (req, res, ds) => {
    healthService.get(ds, (d) => { res.json(d) });
}
