
const getBoard = require('./getBoard');

function sendBoardData(members , sockets, getData = getBoard) {
    members.forEach(m => getData(m._id)
        .then(r => {
            const id = m._id.toString();
            if (sockets[id])
                sockets[id].send(JSON.stringify(r));
        })
        .catch(e => console.log(e)));
}

module.exports = sendBoardData;
