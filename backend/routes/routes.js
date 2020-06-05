

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
    Board.aggregate([
            {$match: {$or: [{creatorId: mongoose.Types.ObjectId("5ea2ffc543a03a3f4133f047")},
                        {members: mongoose.Types.ObjectId("5ea2ffc543a03a3f4133f047")}]}},
        {
            $lookup:{
                from: 'users',
                localField: 'creatorId',//
                foreignField: '_id',
                as: 'creatorId'
            }
        },
        {$unwind: "$creatorId"},
        {$project: {"creatorId._id": 0, "creatorId.hash": 0, "creatorId.active": 0, "creatorId.activatorId": 0, "creatorId.registrationData": 0}},
        //{$unwind: "$members"},
        {
            $lookup:{
                from: 'users',
                localField: 'members',//
                foreignField: '_id',
                as: 'members'
            }
        },
        //{$unwind: "$members"},
        {$project:{"members._id": 0, "members.hash": 0, "members.active": 0, "members.activatorId": 0, "members.registrationData": 0}},
        /*{$group: {
                _id: "$_id", creator: {$first: "$creatorId"}, name: {$first: "$name"}, description: {$first: "$description"},
                addingDate: {$first: "$addingDate"}, endDate: {$first: "$endDate"}, members: { $addToSet: "$members" }
            }
        },*/
        {$project: {_id: 0}}
        ]).then(r => res.send(r));
});


router.get('/agr_col', async (req, res) => {
    const id = "5eafafc5d07fde1f84b44873";
    /*Column.aggregate([
        {$match: { boardId: mongoose.Types.ObjectId(id)}},
        //{$unwind: "$tasks"},
        {
            $lookup:{
                from: 'tasks',
                localField: 'tasks',//
                foreignField: '_id',
                as: 'tasks'
            }
        },
        {$unwind: "$tasks"},
        {
            $lookup:{
                from: 'users',
                localField: 'tasks.workerId',//
                foreignField: '_id',
                as: 'tasks.worker'
            }
        },
        {$unwind: "$tasks.worker"},
        {$group: {
                _id: "$_id", name: {$first: "$name"}, description: {$first: "$description"},
                addingDate: {$first: "$addingDate"}, endDate: {$first: "$endDate"}, board: {$first: "$board"}, tasks: { $addToSet: "$tasks" }
            }
        }
    ])*/
    /*
    *
     {$project:{"tasks.worker.login": 1, "tasks.name": 1, "tasks.endDate": 1, "tasks.done": 1,
     "orderNumber": 1, "_id": 1, "name": 1, "tasks.description": 1, "tasks._id": 1}},
    * */
    /*Column.find({ boardId: mongoose.Types.ObjectId(id)})//TODO: Add select/project
        .populate('tasks', 'name _id workerId description done', 'Task', {}, {}, 'workerId')
        .exec((er, c) => {
            Board.findById(id)
                .then(b => res.json({
                    board: b,
                    columns: c
                }));
            //.exec()
            //res.send(r)
        });*/
    const c = await Column.find({ boardId: mongoose.Types.ObjectId(id)})//TODO: Add select/project
        ///.populate('tasks', 'name _id workerId description done endDate')
        ///.populate('tasks.workerId', "login -_id")
        .exec(/*(er, c) => Column.populate(c, {path: 'tasks.workerId', select: "login -_id"})*/)
        //.then(c => Column.populate(c, {path: 'tasks.workerId', select: "login -_id"}))
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




