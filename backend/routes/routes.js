

const express = require('express');

const mongoose = require('mongoose');
const router = express.Router();
const { activate, RegistrationHandler, reactivate } = require('../handlers/registration');
const passport = require('passport');

const Task = require('../model/Task');
const Column = require('../model/Column');
const Board = require('../model/Board');
const { getUserData, checkAuthenticated, checkNotAuthenticated, logout } = require('../handlers/handlers');

/** The following handlers have been made only for testing operations and will be removed in future */
/** The following agr handlers illustrate how to use mongoose aggregation function */

router.get("/agr_test3", function(req, res)  {//retrieve boards along with their members
        Board.find({$or: [{creatorId: mongoose.Types.ObjectId("5ea2ffc543a03a3f4133f047")},
                {members: mongoose.Types.ObjectId("5ea2ffc543a03a3f4133f047")}]})
            .populate('members', 'email login -_id')
            .populate('creatorId', 'email login -_id')
        .then(r => res.send(r));
});


router.get('/agr_col', async (req, res) => {
    const id = "5eafafc5d07fde1f84b44873";
    const c = await Column.find({ boardId: mongoose.Types.ObjectId(id)})//TODO: Add select/project
        .populate('tasks', 'name _id workerId description done endDate')
        ///.populate('tasks.workerId', "login -_id")
        .exec(/*(er, c) => Column.populate(c, {path: 'tasks.workerId', select: "login -_id"})*/)
        .then(c => Column.populate(c, {path: 'tasks.workerId', select: "login -_id"}))
        .catch(e => console.log(e));
    Board.findById(id)
        .then(b => res.json({
            board: b,
            columns: c
        }))
});

/**
 * Column.find({ boardId: mongoose.Types.ObjectId(id)})//TODO: Add select/project
 .populate('tasks', 'name _id workerId description done')
 .exec((er, c) => {
            Column.populate(c, 'tasks.workerId', "",  (er, columns) => {
                Board.findById(id)
                    .then(b => res.json({
                        board: b,
                        columns: columns
                    }));
                })
                //.exec()
        //res.send(r)
    });
 * */

/**  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  */

router.get('/logout', checkAuthenticated, logout);

router.get('/get_user_data',  checkAuthenticated, getUserData);

router.get('/activate', checkNotAuthenticated, activate);

router.post('/reg', RegistrationHandler);

router.get('/reactivate', reactivate);

router.post('/auth', checkNotAuthenticated, passport.authenticate('signIn', {
    successRedirect: '/api/auth/success',
    failureRedirect: '/api/auth/error',
    failureFlash : true
}));

router.get('/auth/error', function (req, res) {
    const mes = JSON.stringify(req.flash());
    console.log('Flash' + mes);
    res.send(mes);
});

router.get('/auth/success', checkAuthenticated, function (req, res) {
    res.send({ result: "You have successfully authorized!" })
});

module.exports = router;




