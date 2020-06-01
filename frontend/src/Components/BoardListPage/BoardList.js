import React from "react";
import BoardItem from "./BoardItem";
import './boards.css';
import AddBoard from "./AddBoard";
import getWSURL from "../getWSURL";
import {LoadingWheel} from "../LoadingWheel";

class BoardList extends React.Component {
    constructor() {
        super();
        this.state = {boards: null};
        this.ws = new WebSocket(getWSURL('ws/get_boards'));
        this.ws.onmessage = msg => {
            const data = JSON.parse(msg.data);
            //console.log(msg.data);
            if(data.error)
                alert(data.error);
            else {
                data.sort((a, b) => a.name.localeCompare(b.name));
                this.setState({boards: data/*, adding: this.state.adding*/ });
            }
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        console.log('close');
        this.ws.close();
    }

    editField = (name, value, id) => {
        const data = {_id: id, update: {[name]: value}};
        this.ws.send(JSON.stringify(data));
    };

    addBoard = (newBname, newBdescr) => { //Sending data from create board dialog
        alert('sent');
        const data = JSON.stringify({
            _id: '',
            name: newBname,
            description: newBdescr,
        });
        this.ws.send(data);
    };

    deleteBoard = id =>
        this.ws.send(`{"_id": "${id}"}`);

    render() {
        console.log(this.state);
        return (
            <>
                <h1>Boards</h1>
                {
                    this.state.boards ?
                    <div className='boardList'>
                        {this.state.boards.map(b=>
                            <BoardItem key={b._id} description={b.description} id={b._id}
                                       delete={this.deleteBoard} onEdit={this.editField}
                                       name={b.name} members={b.members} endDate={b.endDate}
                                       addingDate={b.addingDate} creator={b.creator}/>)}
                        <AddBoard addBoard={this.addBoard}/>
                    </div> : <LoadingWheel/>
                }
            </>
        );
    }
}


export default BoardList;
