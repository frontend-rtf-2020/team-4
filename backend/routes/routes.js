const express = require('express');

const router = express.Router();
const { activate, RegistrationHandler } = require('./handlers');


const User = require('../model/User');
const Column = require('../model/Column');
const Board = require('../model/Board');

/** The following handlers have been made only for testing operations and will removed in future */
router.get('/test', function(req, res) {
    res.send("OK!");
});

router.get('/db_test', function(req, resp) {
    User.find((err, res) => {
        resp.json(res);
    })
});

router.post('/reg', RegistrationHandler);

/** The following agr handlers illustrate how to use mongoose aggregation function */
router.get("/agr_test", function(req, res)  {// retrieve users along with the column they created
   User.aggregate([{
       $lookup:{
           from: 'columns',
           localField: '_id',//
           foreignField: 'creatorId',
           as: 'creator'
       }
   }]).then(r => res.send(r));
});

router.get("/agr_test2", function(req, res)  {//retrieve columns along with their creators (vice-versa)
    Column.aggregate([{
        $lookup:{
            from: 'users',
            localField: 'creatorId',//
            foreignField: '_id',
            as: 'creator'
        }
    }]).then(r => res.send(r));
});

router.get("/agr_test3", function(req, res)  {//retrieve boards along with their members
    Board.aggregate([
        {$unwind: "$members"},
        {
        $lookup:{
            from: 'users',
            localField: 'members',//
            foreignField: '_id',
            as: 'members'
        }
    }, {$group: {
        _id: "$_id", creatorId: {$first: "$creatorId"}, name: {$first: "$name"}, addingDate: {$first: "$addingDate"}, endDate: {$first: "$endDate"}, members: { $addToSet: "$members" }
                }
    }]).then(r => res.send(r));
});

/**  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  */


router.get('/activate', activate);

router.get('/reg/success', function (req, res) {
    res.send("You have successfully registered!")
});

router.get('/reg/error', function (req, res) {
    res.send("You have successfully registered!")
});

router.get('/registration/success', function (req, res) {
    res.send("You have successfully registered!")
});

router.get('/registration/error', function (req, res) {

    res.send("Lol. No")
});

module.exports = router;




