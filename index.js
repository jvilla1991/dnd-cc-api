let e = require('express');
let nedb = require('nedb');
let cors = require('cors');
let _ = require('lodash');

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

let hr = new healthRepository();

hr.deleteAll().then((a) => {
    hr.insert(new Health('dnobbo', 'dnd-cc', 'healthy', 'Successfully inserted health record'));
});

app.listen(configs.port, () => {
    console.log(`Listening on port ${configs.port}.`);
});
