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
        characters: new nedb({ filename: './data/characters.db', autoload: true }),
        characterDetails: new nedb({ filename: './data/characterDetails.db', autoload: true })
    };

    let hc = new healthController();
    let uc = new userController();

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
        .post((req, res) => { characterController.getAll(req, res, ds); });

    app.route('/character/:username/:character')
        .get(NOT_IMPLEMENTED)
        .post((req, res) => { characterController.get(req, res, ds); });

    app.route('/character/:username/:character/create')
        .get(NOT_IMPLEMENTED)
        .post((req, res) => { characterController.create(req, res, ds); });

    app.route('/character/:username/:character/update')
        .get(NOT_IMPLEMENTED)
        .post((req, res) => { characterController.update(req, res, ds); });
};
