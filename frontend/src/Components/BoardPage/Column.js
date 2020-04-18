import React from "react";
import Task from "./Task";
import "./Column.css";

class Column extends React.Component {
    constructor() {
        super();
        this.state = { name: "Title", addingDate: new Date(), endDate: new Date(), tasks: [ {name: "sdcvsds" } ]};
    }

    componentDidMount() {
    }

    render() {
        return  (
            <div className='Column'>
                <h2>{this.state.name}</h2>
                Begin: {this.state.addingDate.toDateString()}
                <br />
                End: {this.state.endDate.toDateString()}
                Tasks:
                <br/>
                {this.state.tasks.map(b => <Task {...b} key={ b.name } />)}
            </div>
        );
    }
}

export default Column;
