let userService = require('../services/userService');

exports.get = (req, res, ds) => {
    userService.getAllUsers(ds, (d) => { res.json(d) });
};

exports.getByUsername = (req, res, ds) => {
    let { username } = req.params;
    userService.getByUsername({username}, ds, (d) => { res.json(d) });
}

exports.create = (req, res, ds) => {
    let { username } = req.params;
    let { passwordhash } = req.body;

    userService.createUser({username, passwordhash}, ds, (d) => {
        res.json(d);
    });
};
