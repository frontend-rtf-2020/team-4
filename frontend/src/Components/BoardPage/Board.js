import React from "react";
import Column from "./Column";
import getWSURL from "../getWSURL";
import {LoadingWheel} from "../LoadingWheel";
import AddColumn from "./AddColumn";
//import { useParams } from "react-router-dom";
class Board extends React.Component {
    constructor() {
        super();
        this.state = {board: {name: "", description: "", members: [], creator: {login: ""}}, columns: null};
    }

    componentDidMount() {
        this.ws = new WebSocket(getWSURL(`ws/get_detailed_board/${this.props.match.params.id}`));
        this.ws.onmessage = msg => {
            const data = JSON.parse(msg.data);
            console.log(data);
            if(data.error)
                alert(data.error);
            else
                this.setState(data);
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
            <div >
                <h1>Board: {this.state.board.name}</h1>
                Creator:
                <Member>{this.state.board.creator.login}</Member>
                Participants:
                <div className='members'>
                    {this.state.board.members.map(m => <Member key={m.login}>{m.login}</Member>)}
                    <AddMember/>
                </div>
                <div align='center' className='description'>
                    {this.state.board.description}
                </div>
                <div className='columns' >
                    {
                        this.state.columns ? (
                            <>
                            {this.state.columns.map(c => <Column moveLeft={this.moveLeft} moveRight={this.moveRight} key={c._id} column={c}/>) }
                            <AddColumn/>
                            </>):
                        <LoadingWheel/>
                    }
                </div>
            </div>
        );
    }
}

const Member = props => (<div className='member'>
    {props.children}
</div>);

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
