
exports.ping = async (cb) => {
    cb('pong');
};

exports.get = async (ds, cb) => {
    ds.find({}, (e, d) => {
        cb(d);
    })
};
