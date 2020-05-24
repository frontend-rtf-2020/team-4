import React from "react";
import Column from "./Column";
import getWSURL from "../getWSURL";
import {LoadingWheel} from "../LoadingWheel";
import AddColumn from "./AddColumn";
//import SlimSelect from 'slim-select';

//import { useParams } from "react-router-dom";
class Board extends React.Component {
    clearFilter = event => {
        this.setState({...this.state, filter: t => true})
    };
    applyFilter = event => {

        const text = this.filterText.current.value;

        const members = this.state.filterMembers;//[this.memsFilter.current.value];

        function filter(task) {
            return (task.description.indexOf(text) !== -1 || task.name.indexOf(text) !== -1) && members.has(task.worker.login);
        }

        this.setState({...this.state, filter: filter})
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
            if(data.error)
                alert(data.error);
            else
                this.setState({...data,  filter: t => true});
        };
    }


    moveLeft = id => {
        const ind = this.state.columns.findIndex(c => c._id === id);
        if(ind === 0) return;
        const columns = [...this.state.columns];
        const c = columns[ind];
        columns[ind] = columns[ind - 1];
        columns[ind - 1] = c;
        const queryData = {};
        columns.forEach((e, i) => {
            e.orderNumber = i;
            queryData[e._id] = i;
        });
        //TODO: Send queryData
        alert(JSON.stringify(queryData));
        this.setState({board: this.state.board, columns: columns});
    };

    deleteMember = m => {
        const state = {...this.state};
        state.filterMembers.delete(m);
        this.setState(state)
    };

    moveRight = id => {
        const ind = this.state.columns.findIndex(c => c._id === id);
        if(ind === this.state.columns.length - 1) return;
        const columns = [...this.state.columns];
        const c = columns[ind];
        columns[ind] = columns[ind + 1];
        columns[ind + 1] = c;
        const queryData = {};
        columns.forEach((e, i) => {
            e.orderNumber = i;
            queryData[e._id] = i;
        });
        //TODO: Send queryData
        alert(JSON.stringify(queryData));
        this.setState({board: this.state.board, columns: columns});
    };


    render() {
        //const { id } = useParams();
        console.log(this.state);
        if(this.state.columns)
            this.state.columns.sort((a, b) => a.orderNumber - b.orderNumber);
        return (
            <>
                <Members board={this.state.board}/>
                <header className='filter'>
                    <h5>Filter:</h5>
                    <input ref={this.filterText} placeholder='Text'/>
                    <select ref={this.memsFilter}>
                        {this.state.board.members.map(m => <option key={m.login}>{m.login}</option>)}
                    </select>
                    {[...this.state.filterMembers].map(m => <Member onDelete={l => this.deleteMember(m)} key={m.login}>{m}</Member>)}
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
                                        {this.state.columns.map(c=>
                                            <Column filter={this.state.filter} members={this.state.board.members} columns={this.state.columns}
                                                    moveLeft={this.moveLeft} moveRight={this.moveRight} key={c._id} column={c}/>)}
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

const Member = props => (<div className='member'>
    {props.children}
    {props.onDelete ?
        <span className='arrow' style={{fontSize: "0.8em"}} onClick={props.onDelete}>&#10006;</span>
        : ""}
</div>);

const Members = props => (
    <header id='memsHeader'>
        <h4>{props.board.name}</h4>
        <div className='members-cont'>
            <b>Creator:</b>
            <Member>{props.board.creator.login}</Member>
            <b>Participants:</b>
            <div className='members'>
                {props.board.members.map(m => <Member key={m.login}>{m.login}</Member>)}
                <AddMember/>
            </div>
        </div>
        <a className='link-button back' href='/list'>&lt;</a>
    </header>
);

class AddMember extends React.Component {
    add() {
        const identifier = prompt("Enter user id/login/email");
        alert(identifier)
        //TODO: send adding
    }

    render() {
        return (<div className='member add-member' onClick={this.add}>
            +
        </div>);
    }
}

export default Board;
