const WebSocket = require('ws');
export default function WebSocketsInitialization(s) {
const wss = new WebSocket.Server({ server: s, path: "/api/get" });
//const onconnection = require('../comments');
    wss.on('connection', () => {

    });
}
