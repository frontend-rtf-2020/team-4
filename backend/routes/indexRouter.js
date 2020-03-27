const path = require('path');

var express = require('express');
var router = express.Router();

/* Only for testing */
router.get('/*', function(req, res, next) {
    console.log('received');
    res.sendFile(path.resolve("./frontend/index.html"));
    //res.render('index', { title: 'Express' });
});

module.exports = router;
