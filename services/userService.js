let _ = require('lodash');

exports.getAllUsers = async (ds, cb) => {
    ds.users.find({}, { passwordhash: 0 }, (e, d) => { cb(d); });
};

exports.getByUsername = async (params, ds, cb) => {
    ds.users.findOne({ username: params.username }, { passwordhash: 0 }, (e, d) => { cb(d); });
};

exports.createUser = async (params, ds, cb) => {
    return ds.users.insert({
        username: params.username,
        passwordhash: _.defaultTo(params.passwordhash, '')
    }, (e, d) => {
        cb(d);
    });
};
