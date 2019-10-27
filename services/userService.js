let _ = require('lodash');

exports.getAllUsers = async (ds, cb) => {
    ds.find({}, { passwordhash: 0 }, (e, d) => { cb(d); });
};

exports.getByUsername = async (ds, username, cb) => {
    ds.find({ username }, { passwordhash: 0 }, (e, d) => { cb(d); });
};

exports.createUser = async (ds, username, passwordhash, cb) => {
    return ds.insert({ username, passwordhash: _.defaultTo(passwordhash, '') }, (e, d) => {
        cb(d);
    });
};
