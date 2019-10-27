let nedb = require('nedb');

let healthController = require('./controllers/healthController');
let userController = require('./controllers/userController');

let NOT_IMPLEMENTED = (req, res) =>{
    res.json('not implemented');
};

module.exports = (app) => {
    // Controllers
    let healthDs = new nedb({ filename: './data/health.db', autoload: true });
    let usersDs = new nedb({ filename: './data/users.db', autoload: true });
    //let charactersDs = new nedb({ filename: './data/characters.db', autoload: true });
    //let characterDetailsDs = new nedb({ filename: './data/characterDetails.db', autoload: true });

    // Readiness
    app.route('/ping')
        .get(healthController.ping);

    app.route('/health')
        .get((req, res) => { healthController.get(req, res, healthDs) });
    
    // User
    app.route('/users')
        .get((req, res) => { userController.get(req, res, usersDs); });
    
    app.route('/user/:username')
        .get((req, res)  => { userController.getByUsername(req, res, usersDs); })

    app.route('/user/:username/create')
        .post((req, res) => { userController.create(req, res, usersDs); });
    
    app.route('/user/:username/update')
        .post(NOT_IMPLEMENTED);

    
    // Character

};
