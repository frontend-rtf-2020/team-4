const express = require('express');
const router = express.Router();
const {getBoards, getDetailedBoard, editBoard} = require('../handlers/boardList');
const { checkWsAuthenticated } = require('../handlers/handlers');

router.ws('/get_boards', checkWsAuthenticated, getBoards);

router.ws('/get_detailed_board/:id', checkWsAuthenticated, getDetailedBoard);

router.ws('/edit_board', checkWsAuthenticated, editBoard);


module.exports = router;
