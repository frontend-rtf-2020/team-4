
const expressWs = require('express-ws');
function webSocketsInitialization(app, server) {
    expressWs(app, server, {
        wsOptions: {
            perMessageDeflate: false
        }
    });
}

module.exports =  webSocketsInitialization;
