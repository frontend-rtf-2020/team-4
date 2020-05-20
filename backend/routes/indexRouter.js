const path = require('path');
const staticLocation = require('../staticLocation');
var express = require('express');
var router = express.Router();

router.get('/*', function(req, res) {
    console.log('received');
    res.sendFile(path.resolve(path.join(staticLocation, "/index.html")));
});

module.exports = router;
