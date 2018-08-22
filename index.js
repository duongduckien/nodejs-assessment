var express = require('express');
var env = require('./apps/helpers/env');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create controllers
var controllers = require(__dirname + '/apps/controllers');
app.use(controllers);

// Get config information
var host = env.get('server.host');
var port = env.get('server.port');

app.listen(process.env.PORT || port, host, () => {
    console.log('Server running in port', port);
});