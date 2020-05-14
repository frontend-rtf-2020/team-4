import React from "react";
import Column from "./Column";
import getWSURL from "../getWSURL";
//import { useParams } from "react-router-dom";
class Board extends React.Component {
    constructor() {
        super();
        this.state = {board: {name: "", description: ""}, columns: []};
    }

    componentDidMount() {

        this.ws = new WebSocket(getWSURL(`ws/get_detailed_board/${this.props.match.params.id}`));
        //this.ws = new WebSocket(`ws:localhost:8000/ws/get_detailed_board/${this.props.match.params.id}`);
        this.ws.onmessage = msg => {
            const data = JSON.parse(msg.data);
            if(data.error)
                alert(data.error);
            else
                this.setState(data);
        };
    }

    render() {
        //const { id } = useParams();
        console.log(this.state);
        return (
            <div >
                <h1>Board: {this.state.board.name}</h1>
                {this.state.board.description}
                <br/>
                ID: {this.props.match.params.id}

                <div className='columns'>
                    {this.state.columns.map(c => <Column key={c._id} column={c}/>)}
                </div>
            </div>
        );
    }
}

export default Board;
