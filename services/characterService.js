
exports.getAllByUserId = async (params, ds, cb) => {
    ds.characters.find({ userid: params.userid }, (e, d) => {
        if (e) {
            res.json('error in character');
            return;
        }
        cb(d);
    });
};

exports.getByName = async (params, ds, cb) => {
    ds.characters.findOne({userid: params.userid, name: params.name}, (e, d) => {
        cb(d);
    });
};

exports.getDetails = async (params, ds, cb) => {
    ds.characterDetails.findOne({characterid: params.characterid}, (e, d) => { cb(d) });
;}
