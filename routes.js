let nedb = require('nedb');

let healthController = require('./controllers/healthController');
let userController = require('./controllers/userController');
let characterController = require('./controllers/characterController');

let NOT_IMPLEMENTED = (req, res) =>{
    res.json('not implemented');
};

module.exports = (app) => {
    let hc = new healthController();
    let uc = new userController();
    let cc = new characterController();

    // Readiness
    app.route('/ping')
        .get(hc.ping);

    app.route('/health')
        .get(hc.get);
    
    // User
    app.route('/users')
        .get(uc.get);
    
    app.route('/user/:username')
        .get(uc.getByUsername);

    app.route('/user/:username/create')
        .get(NOT_IMPLEMENTED)
        .post(uc.create);
    
    app.route('/user/:username/update')
        .get(NOT_IMPLEMENTED)
        .post(NOT_IMPLEMENTED);
    
    // Character
    app.route('/character/:username/characters')
        .get(NOT_IMPLEMENTED)
        .post(cc.getAll);

    app.route('/character/:username/:character')
        .get(NOT_IMPLEMENTED)
        .post(cc.get);
        //.post(NOT_IMPLEMENTED);

    app.route('/character/:username/:character/create')
        .get(NOT_IMPLEMENTED)
        .post(cc.create);
        //.post(NOT_IMPLEMENTED);

    app.route('/character/:username/:character/update')
        .get(NOT_IMPLEMENTED)
        //.post(cc.update);
        .post(NOT_IMPLEMENTED);
};
