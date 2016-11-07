var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var rotas = require('./rotas');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(rotas);

app.listen(3000);
