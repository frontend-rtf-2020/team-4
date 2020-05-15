const path = require('path');

var express = require('express');
var router = express.Router();

router.get('/*', function(req, res) {
    console.log('received');
    res.sendFile(path.resolve("./frontend/index.html"));
});

module.exports = router;
