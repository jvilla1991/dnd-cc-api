let e = require('express');
let nedb = require('nedb');
let cors = require('cors');
let _ = require('lodash');

let routes = require('./routes');
let configs = require('./configs');

let characters = new nedb({ filename: './data/characters.db', autoload: true });
let characterDetails = new nedb({ filename: './data/characterDetails.db', autoload: true });

// App
let app = e();
app.use(e.json());
app.use(cors());

// Readiness
routes(app);

/// Characters
// Get all
app.post('/character/:username/characters', (req, res) => {
    let { username } = req.params;
    users.findOne({ username }, (e, d) => {
        if (e) {
            res.json('error in user');
            return;
        }
        characters.find({ userid: d._id }, (e, d1) => {
            if (e) {
                res.json('error in character');
                return;
            }
            res.json({ data: d1 });
        });
    });
});

// Get
app.post('/character/:username/:character', (req, res) => {
    let { username, character } = req.params;

    users.findOne({ username }, (e, d) => {
        if (e) {
            res.json('error in user');
            return;
        }
        characters.findOne({ userid: d._id, name: character }, (e, d1) => {
            if (e) {
                res.json('error in character');
                return;
            }
            characterDetails.findOne({ characterId: d1._id }, (e, d2) => {
                if (e) {
                    res.json('error in character detail');
                    return;
                }
                let c = {
                    character: d1,
                    characterDetails: d2
                }
                res.json(c);
            });
        });
    });
});

// Create
app.post('/character/:username/:character/create', (req, res) => {
    let { username, character } = req.params;
    let { details } = req.body;

    users.findOne({ username }, (e, d) => {
        if (e) {
            res.json('error in user');
            return;
        }
        characters.insert({ userid: d._id, name: character }, (e, d1) => {
            if (e) {
                res.json('error in character');
                return;
            }
            let cD = {
                characterId: d1._id,
                ...details
            }
            characterDetails.insert(cD, (e, d2) => {
                res.json(d2);
            });
        });
    });
});

// Update
app.post('/character/:username/:character/update', (req, res) => {
    let { username, character } = req.params;
    let { details } = req.body;

    users.findOne({ username }, (e, d) => {
        if (e) {
            res.json('error in user');
            return;
        }
        characters.findOne({ userid: d._id, name: character }, (e, d1) => {
            if (e) {
                res.json('error in character');
                return;
            }
            characterDetails.findOne({ characterId: d1._id }, (e, d2) => {
                if (e) {
                    res.json('error in character detail');
                    return;
                }
                let cD = {
                    characterId: d1._id,
                    ...details
                }
                characterDetails.update({ _id: d2._id }, cD, {}, () => {
                    res.json('updated');
                });
            });
        });
    });
});

app.listen(configs.port, () => {
    console.log(`Listening on port ${configs.port}.`);
});
