import React from "react";
import Column from "./Column";
import getWSURL from "../getWSURL";
import { LoadingWheel } from "../LoadingWheel";
import AddColumn from "./AddColumn";
import { Members } from "./Members";
import Member from "./Member";

class Board extends React.Component {
    clearFilter = event => {
        this.setState({/*...this.state,*/ filter: t => true})
    };

    applyFilter = event => {

        const text = this.filterText.current.value;

        const members = this.state.filterMembers;

        const filter = task => (task.description.includes(text) || task.name.includes(text)) && members.has(task.worker.login);

        this.setState({ filter: filter})
    };

    addFilterMem = event => {
        const state = {...this.state};
        state.filterMembers.add(this.memsFilter.current.value);
        this.setState(state)
    };

    constructor() {
        super();
        this.filterText = React.createRef();
        this.memsFilter = React.createRef();
        this.state = {board: {name: "", description: "", members: [], creator: {login: ""}}, columns: null, filterMembers: new Set(), filter: t => true};
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
                data.columns.sort((a, b) => a.orderNumber - b.orderNumber);
                this.setState({...data,  filter: t => true});
            }
        };
    }

    componentWillUnmount() {
        this.ws.close();
    }

    removeMemberFromFilter = m => {
        const state = {...this.state};//TODO: maybe rewrite without ...state
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
        const queryData = {[columns[ind]._id]: columns[ind].orderNumber,
            [columns[ind - 1]._id]: columns[ind - 1].orderNumber};
        //TODO: Send queryData

        alert(JSON.stringify(queryData));
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
        const queryData = {[columns[ind]._id]: columns[ind].orderNumber,
            [columns[ind + 1]._id]: columns[ind + 1].orderNumber};
        //TODO: Send queryData

        alert(JSON.stringify(queryData));
        columns.sort((a, b) => a.orderNumber - b.orderNumber);
        this.setState({ columns: columns});
    };

    delete = (id, col) => this.ws.send(JSON.stringify({
        _id: id,
        collection: col
    }));

    deleteTask = id => this.delete(id, 'Task');

    deleteColumn = id => this.delete(id, 'Column');

    addTask = (name, workerId, description, date, columnId) => {
        this.ws.send(JSON.stringify({
            collection: 'Task',
            object: {
                name: name,
                workerId: workerId,
                description: description,
                date: date
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
        console.log(name)
        this.ws.send(JSON.stringify({
            collection: 'Column',
            object: {
                name: name,
                boardId: this.state.board._id,
                orderNumber: this.state.columns.length
            }
        }))
    };

    render() {
        return (
            <>
                <Members board={this.state.board}/>
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
                    <div align='center' className='description'>
                        {this.state.board.description}
                    </div>
                    <div className='columns'>
                        {
                            this.state.columns ? (
                                    <>
                                        {this.state.columns.map(c =>
                                            <Column filter={this.state.filter} members={this.state.board.members} columns={this.state.columns}
                                                    addTask={this.addTask} delete={this.deleteColumn}
                                                    moveLeft={this.moveLeft} moveRight={this.moveRight} key={c._id} column={c} deleteTask={this.deleteTask}/>)}
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
