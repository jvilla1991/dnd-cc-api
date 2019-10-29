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

// Readiness
routes(app);

app.listen(configs.port, () => {
    console.log(`Listening on port ${configs.port}.`);
});
