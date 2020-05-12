
function getUserData(req, res) {
    res.send({username: req.user.login, email: req.user.email});
}

function checkAuthenticated(req, res, next) {
    if(req.user)
        next();
    else
        res.send({error: "Not authenticated"});
}

function checkNotAuthenticated(req, res, next) {
    if(!req.user)
        next();
    else
        res.send({error: "Already authenticated"});
}

function logout(req, res) {
    req.logOut();
}

module.exports = { getUserData, checkAuthenticated, checkNotAuthenticated, logout };
