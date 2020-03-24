import React from "react";
import Task from "./Task";

class Board extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
    }

    render() {
        return (
            <div >
                <h2>Column</h2>
                {this.state.columns.map(b => <Task />)}
            </div>
        );
    }
}

export default Board;
