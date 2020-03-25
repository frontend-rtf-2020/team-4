import React from "react";
import Column from "./Column";

class Board extends React.Component {
    constructor() {
        super();
        this.state = {columns: [{name: "vdsvds", tasks: [{endDate: 0, description: "lopoljk;poj"}]}]};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div >
                <h1>Board</h1>
                {this.state.columns.map(b => <Column />)}
            </div>
        );
    }
}

export default Board;
