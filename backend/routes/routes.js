const express = require('express');

const mongoose = require('mongoose');
const router = express.Router();
const { activate, RegistrationHandler } = require('../handlers/registration');


const User = require('../model/User');
const Column = require('../model/Column');
const Board = require('../model/Board');

/** The following handlers have been made only for testing operations and will be removed in future */

router.post('/reg', RegistrationHandler);

/** The following agr handlers illustrate how to use mongoose aggregation function */
router.get("/agr_test", function(req, res)  {// retrieve users along with the column they created
   User.aggregate([
       {
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
            {$match: {$or: [{creatorId: mongoose.Types.ObjectId("5ea2ffc543a03a3f4133f047"),
                        members: mongoose.Types.ObjectId("5ea2ffc543a03a3f4133f047")}]}},
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
        {$unwind: "$members"},
        {
            $lookup:{
                from: 'users',
                localField: 'members',//
                foreignField: '_id',
                as: 'members'
            }
        },
        {$project:{"members._id": 0, "members.hash": 0, "members.active": 0, "members.activatorId": 0, "members.registrationData": 0}},
        {$group: {
                _id: "$_id", creator: {$first: "$creatorId"}, name: {$first: "$name"}, description: {$first: "$description"},
                addingDate: {$first: "$addingDate"}, endDate: {$first: "$endDate"}, members: { $addToSet: "$members" }
            }
        },
        {$project: {_id: 0}}
        ]).then(r => res.send(r));
});

router.test('/agr_test4', (req, res) => {
    Board.findById(req.params.id)
        .then(r => res.send(r));
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




