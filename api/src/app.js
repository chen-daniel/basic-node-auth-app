const express = require('express');

const app = express();
const routes = require('./routes');
const config = require('./config');

routes(app);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(config.port, () => console.log(`App listening on port ${config.port}!`))