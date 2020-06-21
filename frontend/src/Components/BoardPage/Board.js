import React from "react";
import Column from "./Column";
import getWSURL from "../getWSURL";
import { LoadingWheel } from "../LoadingWheel";
import AddColumn from "./AddColumn";
import { Members } from "./Members";
import Member from "./Member";
import Popup from "../UI/Popup";
import WsClient from "./WsClient";

class Board extends React.Component {

    constructor() {
        super();
        this.filterText = React.createRef();
        this.memsFilter = React.createRef();
        this.state = {board: {name: "", description: "", members: [], creatorId: {login: ""}},
            columns: null, filterMembers: new Set(), filter: t => true, dragId: "", addError: "", addSucces: ""};
        this.WsClient = new WsClient();
    }

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

    componentDidMount() {
        this.ws = new WebSocket(getWSURL(`ws/get_detailed_board/${this.props.match.params.id}`));
        this.ws.onmessage = msg => {
            const data = JSON.parse(msg.data);
            if(data.error)
                alert(data.error);
            else {
                data.columns.sort((a, b) => a.orderNumber - b.orderNumber);
                this.setState({...data,  filter: t => true});
            }
        };
        this.WsClient.setWS(this.ws);
    }

    componentWillUnmount() {
        this.WsClient.close();
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
        this.ws.send(JSON.stringify([
            this.WsClient.getColumnChangingObject(columns[ind]._id, "orderNumber", columns[ind].orderNumber),
            this.WsClient.getColumnChangingObject(columns[ind - 1]._id, "orderNumber", columns[ind - 1].orderNumber),
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
        columns[ind + 1].orderNumber = c;
        const data = JSON.stringify([
            this.WsClient.getColumnChangingObject(columns[ind]._id, "orderNumber", columns[ind].orderNumber),
            this.WsClient.getColumnChangingObject(columns[ind + 1]._id, "orderNumber", columns[ind + 1].orderNumber),
        ]);
        this.ws.send(data);
        columns.sort((a, b) => a.orderNumber - b.orderNumber);
        this.setState({ columns: columns});
    };

    deleteTask = (columnId, id) => this.delete(id, 'Task', {
        id: columnId,
        collection: 'Column',
        field: 'tasks'
    });

    delete = (id, col, parent, children) => this.ws.send(JSON.stringify({
        _id: id,
        collection: col,
        parent: parent,
        children: children
    }));

    deleteColumn = id => this.WsClient.delete(id, 'Column', undefined, {
        collection: 'Task',
        field: 'tasks'
    });

    addTask = (name, workerId, description, date, columnId) =>
        this.WsClient.addTask(name, workerId, description, date, columnId);

    addColumn = name =>
            this.WsClient.addColumn(name, this.state.board._id, this.state.columns.length);

    changeColumn = (id, fieldName, value) =>
            this.WsClient.changeColumn(id, fieldName, value);

    addMember = identifier => {
        fetch('/api/checkUser?identifier=' + encodeURI(identifier))
            .then(r => r.json())
            .then(r => {
                console.log(r);
                if(r.error)
                    this.setState({addError: r.error, addSuccess : ""});
                else {
                    this.setState({addSuccess: "User has been successfully added!", addError: ""});
                    this.ws.send(`{"newMemberId":"${r.result}"}`);
                }

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
            this.WsClient.getColumnChangingObject(columns[indDrag]._id, "orderNumber", columns[indDrag].orderNumber),
            this.WsClient.getColumnChangingObject(columns[indDrop]._id, "orderNumber", columns[indDrop].orderNumber),
        ]);
        this.ws.send(data);
        columns.sort((a, b) => a.orderNumber - b.orderNumber);
        this.setState({ columns: columns});
        event.target.style.background = "linear-gradient(rgba(230,230,230, 0.9),rgba(210,210,210, 0.8))";
        event.target.style.border = ""
    };

    onDragStart = (event, id) => {
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
                            success = {this.state.addSuccess}
                            error = {this.state.addError}
                            addMember = {this.addMember}
                            text='Add Member'/>
                    <div align='center' className='description'>
                        {this.state.board.description}
                    </div>
                    <div className='columns'>
                        {
                            this.state.columns ? (
                                    <>
                                        {this.state.columns.map(c =>
                                            <Column filter={this.state.filter} members={this.state.board.members} columns={this.state.columns}
                                                    changeColumn={this.changeColumn} changeTask={this.WsClient.changeTask} moveLeft={this.moveLeft}
                                                    moveRight={this.moveRight} key={c._id} column={c} deleteTask={this.deleteTask}
                                                    delete={this.deleteColumn}
                                                    onDragOver={this.onDragOver} onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}
                                                    onDragEnter={this.onDragEnter} WsClient={this.WsClient}
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
