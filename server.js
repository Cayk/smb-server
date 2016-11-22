var express    = require('express');
var logger    = require('morgan');
var app        = express();
var bodyParser = require('body-parser');

var rotas = require('./rotas');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger("dev"));

app.use(rotas);

app.listen(3000);
