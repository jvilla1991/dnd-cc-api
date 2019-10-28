
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
};

exports.create = async (params, ds, cb) => {
    let c = {
        userid: params.userid,
        name: params.name
    };
    ds.characters.insert(c, (e, d) => {
        let cD = {
            characterid: d._id,
            ...params.details
        }
        ds.characterDetails.insert(cD, (e, d1) => { cb(d1); });
    });
};

exports.updateDetails = async (params, ds, cb) => {
    console.log(params);
    ds.characterDetails.update({_id: params.id}, params.cD, (e, d) => { cb(d); });
};
