import React from "react";
import BoardItem from "./BoardItem";

class BoardList extends React.Component {
    constructor() {
        super();
        this.state = {boards: [{name: "asda", description: "uiyuhjyuthgtygt"}]};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div >
                <h1>Boards</h1>
                {this.state.boards.map(b => <BoardItem/>)}
            </div>
        );
    }
}

export default BoardList;
