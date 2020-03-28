const express = require('express');
const router = express.Router();
const User = require('../model/User');

/* Only for testing */
router.get('/test', function(req, res, next) {
    res.send("OK!");
    //res.render('index', { title: 'Express' });
});

router.get('/db_test', function(req, resp, next) {
    User.find((err, res) => {
        resp.json(res);
    })
    //res.render('index', { title: 'Express' });
});


module.exports = router;
