/*const WebSocket = require('ws');
const Board = require('./model/Board');
const User = require('./model/User');*/

const expressWs = require('express-ws');
function webSocketsInitialization(app, server) {/* wss = new WebSocket.Server({ server: s, path: "/api/get" });
//const onconnection = require('../comments');
    wss.on('connection', ws => {
        ws.on('')
    });*/
    expressWs(app, server);

}

module.exports =  webSocketsInitialization;
