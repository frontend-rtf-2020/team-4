import React from "react";
import Column from "./Column";
import getWSURL from "../getWSURL";
import { LoadingWheel } from "../LoadingWheel";
import AddColumn from "./AddColumn";
import { Members } from "./Members";
import Member from "./Member";
import Popup from "../UI/Popup";
/**
 * TODO: Divide class into several parts, introducing all ws functions to another class!
 *
 */

class Board extends React.Component {
    clearFilter = event => {
        this.setState({filter: t => true})
    };

    applyFilter = event => {

        const text = this.filterText.current.value;

        const members = this.state.filterMembers;

        const filter = task => (task.description.includes(text) || task.name.includes(text))
            &&  (members.size === 0 || members.has(task.workerId.login));

        this.setState({ filter: filter})
    };

    addFilterMem = event => {
        const state = {...this.state};
        state.filterMembers.add(this.memsFilter.current.value);
        this.setState(state)
    };
/*
    togglePopup = () => {
        this.setState({
            showPopup: !this.state.showPopup
        });
    };
*/
    constructor() {
        super();
        this.filterText = React.createRef();
        this.memsFilter = React.createRef();
        this.state = {board: {name: "", description: "", members: [], creatorId: {login: ""}},
            columns: null, filterMembers: new Set(), filter: t => true, dragId: ""};
    }

    componentDidMount() {
        this.ws = new WebSocket(getWSURL(`ws/get_detailed_board/${this.props.match.params.id}`));
        this.ws.onmessage = msg => {
            const data = JSON.parse(msg.data);
            console.log(data);
            console.log(data.columns);
            if(data.error)
                alert(data.error);
            else {
                console.log(data);
                data.columns.sort((a, b) => a.orderNumber - b.orderNumber);
                this.setState({...data,  filter: t => true});
            }
        };
    }

    componentWillUnmount() {
        this.ws.close();
    }

    removeMemberFromFilter = m => {
        const state = {...this.state};
        state.filterMembers.delete(m);
        this.setState(state)
    };

    moveLeft = id => {
        const ind = this.state.columns.findIndex(c => c._id === id);
        if(ind === 0) return;
        const columns = [...this.state.columns];
        const c = columns[ind].orderNumber;
        columns[ind].orderNumber = columns[ind - 1].orderNumber;
        columns[ind - 1].orderNumber = c;
        /**const queryData = [{
            _id:columns[ind]._id,

        }];
            {[columns[ind]._id]: columns[ind].orderNumber,
            [columns[ind - 1]._id]: columns[ind - 1].orderNumber};*/
        this.ws.send(JSON.stringify([
            this.getColumnChangingObject(columns[ind]._id, "orderNumber", columns[ind].orderNumber),
            this.getColumnChangingObject(columns[ind - 1]._id, "orderNumber", columns[ind - 1].orderNumber),
        ]));
        columns.sort((a, b) => a.orderNumber - b.orderNumber);
        this.setState({ columns: columns});
    };


    moveRight = id => {
        const ind = this.state.columns.findIndex(c => c._id === id);
        if(ind === this.state.columns.length - 1) return;
        const columns = [...this.state.columns];
        const c = columns[ind].orderNumber;
        columns[ind].orderNumber = columns[ind + 1].orderNumber;
        columns[ind + 1].orderNumber = c;/*
        const queryData = {[columns[ind]._id]: columns[ind].orderNumber,
            [columns[ind + 1]._id]: columns[ind + 1].orderNumber};
        alert(JSON.stringify(queryData));*/
        const data = JSON.stringify([
            this.getColumnChangingObject(columns[ind]._id, "orderNumber", columns[ind].orderNumber),
            this.getColumnChangingObject(columns[ind + 1]._id, "orderNumber", columns[ind + 1].orderNumber),
        ]);
        console.log(data);
        this.ws.send(data);
        columns.sort((a, b) => a.orderNumber - b.orderNumber);
        this.setState({ columns: columns});
    };

    delete = (id, col, parent, children) => this.ws.send(JSON.stringify({
        _id: id,
        collection: col,
        parent: parent,
        children: children
    }));

    deleteTask = (columnId, id) => this.delete(id, 'Task', {
        id: columnId,
        collection: 'Column',
        field: 'tasks'
    });

    deleteColumn = id => this.delete(id, 'Column', undefined, {
        collection: 'Task',
        field: 'tasks'
    });

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

    addColumn = name => {
        console.log(this.state.board._id);
        console.log(name);
        this.ws.send(JSON.stringify({
            collection: 'Column',
            object: {
                name: name,
                boardId: this.state.board._id,
                orderNumber: this.state.columns.length
            }
        }))
    };

    getColumnChangingObject = (id, fieldName, value) => ({
        _id: id,
        object: {
            [fieldName]: value,
        },
        collection: 'Column',
    });

    changeColumn = (id, fieldName, value) =>
        this.ws.send(JSON.stringify(this.getColumnChangingObject(id, fieldName, value)));

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

    toggleDoneTask = (id, done) => {
        this.ws.send(JSON.stringify({
            collection: 'Task',
            _id: id,
            object: {
                done: done
            }
        }))
    };

    addMember = identifier => {
        fetch('/api/checkUser?identifier=' + encodeURI(identifier))
            .then(r => r.json())
            .then(r => {
                console.log(r);
                if(r.error)
                    alert(r.error);
                else
                    this.ws.send(`{"newMemberId":"${r.result}"}`);
            })
            .catch(console.log);
    };

    onDragOver = (event) => {
    event.preventDefault();
    };

    onDragEnter = (event, id) => {
        if ( event.target.className === "Column content") {
            event.target.style.border = "dotted black 3px";
            event.target.style.background= "rgb(255, 255, 128)";
            this.setState({dropId : id});
        }
    };

    onDragEnd = (event, id) => {
        const indDrop = this.state.columns.findIndex(c => c._id === this.state.dropId);
        const columns = [...this.state.columns];
        const drop = columns[indDrop].orderNumber;
        console.log(drop);
        const indDrag = this.state.columns.findIndex(c => c._id === this.state.dragId);
        const drag = columns[indDrag].orderNumber;
        console.log(drag);
        columns[indDrag].orderNumber = columns[indDrop].orderNumber;
        columns[indDrop].orderNumber = drag;
        const data = JSON.stringify([
            this.getColumnChangingObject(columns[indDrag]._id, "orderNumber", columns[indDrag].orderNumber),
            this.getColumnChangingObject(columns[indDrop]._id, "orderNumber", columns[indDrop].orderNumber),
        ]);
        this.ws.send(data);
        columns.sort((a, b) => a.orderNumber - b.orderNumber);
        this.setState({ columns: columns});
        event.target.style.background = "linear-gradient(rgba(230,230,230, 0.9),rgba(210,210,210, 0.8))";
        event.target.style.border = ""
    };

    onDragStart = (event, id) => {
       // event.dataTransfer.setData("id", id);
        this.setState({dragId : id});
    };


    render() {
        return (
            <>
                <Members board={this.state.board} onAdd={this.addMember} />
                <header className='filter'>
                    <h5>Filter:</h5>
                    <input ref={this.filterText} placeholder='Text'/>
                    <select ref={this.memsFilter}>
                        {this.state.board.members.map(m => <option key={m.login}>{m.login}</option>)}
                    </select>
                    {[...this.state.filterMembers].map(m => <Member onDelete={l => this.removeMemberFromFilter(m)} key={m.login}>{m}</Member>)}
                    <button onClick={this.addFilterMem}>Add</button>
                    <button onClick={this.applyFilter} >Apply</button>
                    <button onClick={this.clearFilter}>Clear</button>
                </header>
                <div>
                    <Popup
                            addMember = {this.addMember}
                            text='Add Member'/>
                    <div align='center' className='description'>
                        {this.state.board.description}
                    </div>
                    <div className='columns droppable'>
                        {
                            this.state.columns ? (
                                    <>
                                        {this.state.columns.map(c =>
                                            <Column filter={this.state.filter} members={this.state.board.members} columns={this.state.columns} toggleDoneTask={this.toggleDoneTask}
                                                    addTask={this.addTask} delete={this.deleteColumn} changeColumn={this.changeColumn} changeTask={this.changeTask}
                                                    moveLeft={this.moveLeft} moveRight={this.moveRight} key={c._id} column={c} deleteTask={this.deleteTask}
                                                    onDragOver={this.onDragOver} onDragEnd={this.onDragEnd} onDragStart={this.onDragStart} onDragEnter={this.onDragEnter}
                                            />)}
                                        <AddColumn addColumn={this.addColumn}/>
                                    </>) :
                                (<div className='centered'>
                                    <LoadingWheel/>
                                </div>)
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default Board;
