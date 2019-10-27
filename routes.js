let nedb = require('nedb');

let healthController = require('./controllers/healthController');
let userController = require('./controllers/userController');
let characterController = require('./controllers/characterController');

let NOT_IMPLEMENTED = (req, res) =>{
    res.json('not implemented');
};

module.exports = (app) => {
    // Datastore
    let ds = {
        health: new nedb({ filename: './data/health.db', autoload: true }),
        users: new nedb({ filename: './data/users.db', autoload: true }),
        characters: new nedb({ filename: './data/characters.db', autoload: true }),
        characterDetails: new nedb({ filename: './data/characterDetails.db', autoload: true })
    };

    // Readiness
    app.route('/ping')
        .get(healthController.ping);

    app.route('/health')
        .get((req, res) => { healthController.get(req, res, ds) });
    
    // User
    app.route('/users')
        .get((req, res) => { userController.get(req, res, ds); });
    
    app.route('/user/:username')
        .get((req, res)  => { userController.getByUsername(req, res, ds); });

    app.route('/user/:username/create')
        .get(NOT_IMPLEMENTED)
        .post((req, res) => { userController.create(req, res, ds); });
    
    app.route('/user/:username/update')
        .get(NOT_IMPLEMENTED)
        .post(NOT_IMPLEMENTED);
    
    // Character
    app.route('/character/:username/characters')
        .get(NOT_IMPLEMENTED)
        .post((req, res) => { characterController.getAll(req, res, ds); });

    app.route('/character/:username/:character')
        .get(NOT_IMPLEMENTED)
        .post((req, res) => { characterController.get(req, res, ds); });
};
