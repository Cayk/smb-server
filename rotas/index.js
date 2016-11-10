var express = require('express');
var router = express.Router();

router.use("/localizacao", require('./rotaLocalizacao'));
router.use("/bicicleta", require('./rotaBicicleta'));
router.use("/pessoa", require('./rotaPessoa'));

module.exports = router;
