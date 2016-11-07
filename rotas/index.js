var express = require('express');
var router = express.Router();

router.use("/localizacao", require('./localizacao'));

module.exports = router;
