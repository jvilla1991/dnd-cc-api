let health = require('./controllers/healthController');
let user = require('./controllers/userController');

let NOT_IMPLEMENTED = (req, res) =>{
    res.json('not implemented');
};

module.exports = (app, data) => {
    // Readiness
    app.route('/ping')
        .get(health.ping);
    
    // User
    app.route('/users')
        .get((req, res) => { user.get(req, res, data.users); });
    
    app.route('/user/:username')
        .get((req, res)  => { user.getByUsername(req, res, data.users); })

    app.route('/user/:username/create')
        .post((req, res) => { user.create(req, res, data.users); });
    
    app.route('/user/:username/update')
        .post(NOT_IMPLEMENTED);

    
    // Character

};
