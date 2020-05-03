import React from "react";
import BoardItem from "./BoardItem";

class BoardList extends React.Component {
    constructor() {
        super();
        this.state = {boards: [{name: "asda", description: "uiyuhjyuthgtygt"}]};
        this.ws = new WebSocket(`ws:localhost:8000/ws/get_boards`);//TODO: change host
        this.ws.onmessage = msg => {
            const data = JSON.parse(msg.data);
            if(data.error)
                alert(data.error);
            else
                this.setState({boards: JSON.parse(msg.data) });
        };
    }

    componentDidMount() {

    }

    render() {
        console.log(this.state);
        return (
            <div >
                <h1>Boards</h1>
                {this.state.boards.map(b => <BoardItem name = {b.name} />)}
            </div>
        );
    }
}

export default BoardList;
