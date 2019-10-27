let health = require('./controllers/healthController');

module.exports = (app) => {
    app.route('/ping')
        .get(health.ping);

};
