
const expressWs = require('express-ws');
function webSocketsInitialization(app, server) {
    // eslint-disable-next-line no-unused-vars
    const ews = expressWs(app, server, {
        wsOptions: {
            perMessageDeflate: false
        }
    });
}

module.exports =  webSocketsInitialization;
