var express = require('express');
var router = express.Router();

/* Only for testing */
router.get('/test', function(req, res, next) {
    res.send("OK!");
    //res.render('index', { title: 'Express' });
});

module.exports = router;
