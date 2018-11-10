const express = require('express');

const app = express();
const routes = require('./routes');
const config = require('./config');

routes(app);

const AppDAO = require('../db/appDAO');

const dao = new AppDAO('./app.db');

app.listen(config.port, () => console.log(`App listening on port ${config.port}!`))