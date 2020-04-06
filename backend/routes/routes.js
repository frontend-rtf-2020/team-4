const express = require('express');
const router = express.Router();
const { activate } = require('./handlers');
const User = require('../model/User');

/* Only for testing */
router.get('/test', function(req, res, next) {
    res.send("OK!");
});

router.get('/db_test', function(req, resp, next) {
    User.find((err, res) => {
        resp.json(res);
    })
});

router.get('/activate', activate);

module.exports = router;
