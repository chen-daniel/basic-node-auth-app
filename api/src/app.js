const express = require('express');

const app = express();
const routes = require('./routes');
const config = require('./config');

routes(app);

app.listen(config.port, () => console.log(`App listening on port ${config.port}!`))