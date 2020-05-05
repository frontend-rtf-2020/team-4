import React from "react";
import Column from "./Column";
import { useParams } from "react-router-dom";
class Board extends React.Component {
    constructor() {
        super();
        this.state = {columns: [{name: "vdsvds", tasks: [{endDate: 0, description: "lopoljk;poj"}]}]};

    }

    componentDidMount() {
        this.ws = new WebSocket(`ws:localhost:8000/ws/get_detailed_board/${this.props.match.params.id}`);//TODO: change host
        this.ws.onmessage = msg => {
            const data = JSON.parse(msg.data);
            //console.log(msg.data);
            if(data.error)
                alert(data.error);
            else
                this.setState({board: data });
        };
    }

    render() {
        //const { id } = useParams();
        return (
            <div>
                <h1>Board</h1>
                ID: {this.props.match.params.id}
                <Column/>
            </div>
        );
    }
}

export default Board;
