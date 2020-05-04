import React from "react";
import Column from "./Column";
import { useParams } from "react-router-dom";
class Board extends React.Component {
    constructor() {
        super();
        this.state = {columns: [{name: "vdsvds", tasks: [{endDate: 0, description: "lopoljk;poj"}]}]};
    }

    componentDidMount() {
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
