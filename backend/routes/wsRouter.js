const express = require('express');
const router = express.Router();
const boardListWSHandler = require('../handlers/boardList');
const detailedBoardWSHandler = require('../handlers/detailedBoard');
const { checkWsAuthenticated } = require('../handlers/handlers');

router.ws('/get_boards', checkWsAuthenticated, boardListWSHandler);

router.ws('/get_detailed_board/:id', checkWsAuthenticated, detailedBoardWSHandler);

module.exports = router;
