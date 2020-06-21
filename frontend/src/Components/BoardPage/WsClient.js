
class WsClient {

    constructor(ws) {
        this.ws = ws;
    }

    toggleDoneTask = (id, done) => {
        this.ws.send(JSON.stringify({
            collection: 'Task',
            _id: id,
            object: {
                done: done
            }
        }))
    };

    delete = (id, col, parent, children) => this.ws.send(JSON.stringify({
        _id: id,
        collection: col,
        parent: parent,
        children: children
    }));

    close = () =>
        this.ws.close();

    changeTask = (oldId, id, name, workerId, description, date, columnId) => {
        console.log(date.toString());
        this.ws.send(JSON.stringify({
            collection: 'Task',
            _id: id,
            object: {
                name: name,
                workerId: workerId,
                description: description,
                endDate: date//TODO: fix date format
            },
            parent: {
                id: columnId,
                oldId: oldId,
                collection: 'Column',
                field: 'tasks'
            }
        }))
    };

    addTask = (name, workerId, description, date, columnId) => {
        console.log(date.toString());
        this.ws.send(JSON.stringify({
            collection: 'Task',
            object: {
                name: name,
                workerId: workerId,
                description: description,
                endDate: date//TODO: fix date format
            },
            parent: {
                id: columnId,
                collection: 'Column',
                field: 'tasks'
            }
        }))
    };

    changeColumn = (id, fieldName, value) =>
        this.ws.send(JSON.stringify(this.getColumnChangingObject(id, fieldName, value)));

    getColumnChangingObject = (id, fieldName, value) => ({
        _id: id,
        object: {
            [fieldName]: value,
        },
        collection: 'Column',
    });

    addColumn = (name, boardId, colLength) => {
        console.log(boardId);
        console.log(name);
        this.ws.send(JSON.stringify({
            collection: 'Column',
            object: {
                name: name,
                boardId: boardId,
                orderNumber: colLength
            }
        }))
    }
}
export default WsClient;

