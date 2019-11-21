let e = require('express');
let nedb = require('nedb');
let cors = require('cors');
let _ = require('lodash');
let uuid = require('uuid/v1');

let routes = require('./routes');
let configs = require('./configs');

// App
let app = e();
app.use(e.json());
app.use(cors());

// Setup routes
routes(app);

// Setup Health
let healthRepository = require('./repository/healthRepository');
let Health = require('./models/Health');
let session = new Health(uuid(), 'dnd-cc', 'healthy', 'Successfully inserted health record')

let hr = new healthRepository();

hr.deleteAll().then((a) => {
    hr.insert(session).then((d) => {
        app.listen(configs.port, () => {
            console.log(`Listening on port [${configs.port}]\nSession uuid [${session.getSession()}]\nHealth: ${session.json()}`);
        });
    });
});
