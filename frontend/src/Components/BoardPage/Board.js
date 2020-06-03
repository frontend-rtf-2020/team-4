import React from "react";
import Column from "./Column";
import getWSURL from "../getWSURL";
import { LoadingWheel } from "../LoadingWheel";
import AddColumn from "./AddColumn";
import { Members } from "./Members";
import Member from "./Member";
//import SlimSelect from 'slim-select';

//import { useParams } from "react-router-dom";
class Board extends React.Component {
    clearFilter = event => {
        this.setState({/*...this.state,*/ filter: t => true})
    };

    applyFilter = event => {

        const text = this.filterText.current.value;

        const members = this.state.filterMembers;//[this.memsFilter.current.value];

        function filter(task) {
            return (task.description.includes(text)  || task.name.includes(text)) && members.has(task.worker.login);
        }

        this.setState({/*...this.state,*/ filter: filter})
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
            [columns[ind - 1]._id]: columns[ind - 1].orderNumber};/*
        columns.forEach((e, i) => {
            e.orderNumber = i;
            queryData[e._id] = i;
        });*/
        //TODO: Send queryData

        alert(JSON.stringify(queryData));
        columns.sort((a, b) => a.orderNumber - b.orderNumber);
        this.setState({/*board: this.state.board,*/ columns: columns});
    };

    moveRight = id => {
        const ind = this.state.columns.findIndex(c => c._id === id);
        if(ind === this.state.columns.length - 1) return;
        const columns = [...this.state.columns];
        const c = columns[ind].orderNumber;
        columns[ind].orderNumber = columns[ind + 1].orderNumber;
        columns[ind + 1].orderNumber = c;
        const queryData = {[columns[ind]._id]: columns[ind].orderNumber,
            [columns[ind + 1]._id]: columns[ind + 1].orderNumber};/*
        columns.forEach((e, i) => {
            e.orderNumber = i;
            queryData[e._id] = i;
        });*/
        //TODO: Send queryData

        alert(JSON.stringify(queryData));
        columns.sort((a, b) => a.orderNumber - b.orderNumber);
        this.setState({/*board: this.state.board,*/ columns: columns});
    };

    deleteTask = id => {
        console.log(id);
        this.ws.send(JSON.stringify({
            _id: id,
            collection: 'Task'
        }))
    };

    render() {
        //const { id } = useParams();
        console.log(this.state);
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
                    {/*<input ref={this.memsFilter} onClick={this.show} readOnly/>*/}
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
                                                    moveLeft={this.moveLeft} moveRight={this.moveRight} key={c._id} column={c} deleteTask={this.deleteTask}/>)}
                                        <AddColumn/>
                                    </>) :
                                <LoadingWheel/>
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default Board;
