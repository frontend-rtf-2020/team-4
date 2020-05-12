
function getUserData(req, res) {
    res.send({login: req.user.login, email: req.user.email});
}

function checkAuthenticated(req, res, next) {
    if(req.user)
        next();
    else
        res.send({error: "Not authenticated"});
}

function checkWsAuthenticated(ws, req, next) {

    //console.log(ws.upgradeReq.session.passport.user);
    //console.log('req: ' + JSON.stringify(req));
    if(req.user)
        next();
    else {
        ws.send({error: "Not authenticated"});
        ws.disconnect();
    }
}

function checkNotAuthenticated(req, res, next) {
    if(!req.user)
        next();
    else
        res.send({error: "Already authenticated"});
}

function logout(req, res) {
    req.logOut();
    res.send({ result: 'Successful logout' });
}

module.exports = { getUserData, checkAuthenticated, checkNotAuthenticated, logout, checkWsAuthenticated };
