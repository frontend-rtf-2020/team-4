
const expressWs = require('express-ws');
function webSocketsInitialization(app, server) {
    const ews = expressWs(app, server, {
        wsOptions: {
            perMessageDeflate: false
        }
    });
    //console.log(ews.getWss());
}

module.exports =  webSocketsInitialization;
