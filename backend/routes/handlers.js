
const User = require('../model/User');

function activate (req, resp, next) {
    User.findOneAndUpdate({activatorId: req.query.id}, { active: true }, (err, user) => {
        resp.send(err);
    });
}

module.exports = { activate };
