let userService = require('../services/userService');
let charactersService = require('../services/characterService')

exports.getAll = (req, res, ds) => {
    let { username } = req.params;
    userService.getByUsername({username}, ds, (d) => {
        charactersService.getAllByUserId({userid: d._id}, ds, (d1) => { res.json(d1); });
    });
};

exports.get = (req, res, ds) => {
    let { username, character } = req.params;
    

    userService.getByUsername({username}, ds, (d) => {
        charactersService.getByName({userid: d._id, name: character}, ds, (d1) => {
            charactersService.getDetails({characterid: d1._id}, ds, (d2) => {
                let c = {
                    character: d1,
                    characterDetails: d2
                }

                res.json(c);
            });
        });
    });
};
