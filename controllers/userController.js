let user = require('../services/userService');

exports.get = (req, res, ds) => {
    user.getAllUsers(ds, (d) => { res.json(d) });
};

exports.getByUsername = (req, res, ds) => {
    let { username } = req.params;
    user.getByUsername(ds, username, (d) => { res.json(d) });
}

exports.create = (req, res, ds) => {
    let { username } = req.params;
    let { passwordhash } = req.body;

    user.createUser(ds, username, passwordhash, (d) => {
        res.json(d);
    });
};
