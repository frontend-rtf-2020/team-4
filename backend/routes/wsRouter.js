const express = require('express');

const router = express.Router();
router.ws('/ss', function(ws, req, next) {
    console.log("sas");
    ws.on('message', function(msg) {
        ws.send(msg);
    })
});

module.exports = router;
