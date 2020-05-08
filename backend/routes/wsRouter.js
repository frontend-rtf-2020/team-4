const express = require('express');
const router = express.Router();
const {getBoards, getDetailedBoard, editBoard} = require('../handlers/boardList');

router.ws('/get_boards', getBoards);

router.ws('/get_detailed_board/:id', getDetailedBoard);

router.ws('/edit_board', editBoard);


module.exports = router;
