import React from "react";
import BoardItem from "./BoardItem";
import './boards.css';
import AddBoard from "./AddBoard";

class BoardList extends React.Component {
    constructor() {
        super();
        this.state = {boards: []};
        this.ws = new WebSocket(`ws:localhost:8000/ws/get_boards`);//TODO: change host
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

    addBoard = data => {
        alert('sent');
        this.ws.send(data);
    };

    render() {
        console.log(this.state);
        return (
            <>
                <h1>Boards</h1>
                <div className='boardList'>
                    {this.state.boards.map(b => <BoardItem key={b._id} description={b.description} id={b._id} name = {b.name}
                                                           members={b.members} endDate={b.endDate} addingDate = {b.addingDate} creator = {b.creator} />)}
                    <AddBoard addBoard={this.addBoard}/>
                </div>
            </>
        );
    }
}


export default BoardList;
