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
        console.log('props' + this.props);
        return  (
            <div className='Column content'>
                <h2>{this.props.column.name}</h2>
                {/*}
                Begin: {this.props.column.addingDate.toDateString()}
                <br />
                End: {this.props.column.endDate.toDateString()}
                */}
                Tasks:
                <br/>
                {this.props.column.tasks.map(b => <Task {...b} key={ b.name } />)}
            </div>
        );
    }
}

export default Column;
