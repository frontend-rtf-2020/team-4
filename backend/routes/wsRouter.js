const express = require('express');
const router = express.Router();
const {getBoards, getDetailedBoard} = require('./dataAccess');

router.ws('/get_boards', getBoards);

router.ws('/get_detailed_board/:id', getDetailedBoard);

module.exports = router;
