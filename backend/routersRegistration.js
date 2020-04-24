
const apiRouter = require('./routes/routes');
const indexRouter = require('./routes/indexRouter');
const wsRouter = require('./routes/wsRouter');
function routerRegistration(app) {
    app.use('/aa' , wsRouter);

    app.use('/api' , apiRouter);
    app.use('/' , indexRouter);
}

module.exports = routerRegistration;
