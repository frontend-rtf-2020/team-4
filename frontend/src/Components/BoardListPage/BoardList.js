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
            else
                this.setState({boards: data, adding: this.state.adding });
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.ws.close();
    }

    addBoard = data => {
        alert('sent');
        this.ws.send(data);
    };

    render() {
        console.log(this.state);
        if(this.state.boards)
            this.state.boards.sort((a, b) => a.name.localeCompare(b.name));
        return (
            <>
                <h1>Boards</h1>
                {
                    this.state.boards ?
                    <div className='boardList'>
                        {this.state.boards.map(b=>
                            <BoardItem key={b._id} description={b.description} id={b._id}
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
