import React from "react";
import Task from "./Task";
import "./Column.css";
import AddTask from "./AddTask";

class Column extends React.Component {
    moveLeft = event => {
        this.props.moveLeft(this.props.column._id);
    };
    moveRight = event => {
        this.props.moveRight(this.props.column._id);
    };
    constructor() {
        super();
        this.state = { name: "Title", addingDate: "", endDate: "", tasks: [ {name: "sdcvsds" } ], editing: false};
    }

    delete = event => {
        //TODO: Make deletion
        alert("deletion")
    };

    edit = event => {

    };

    componentDidMount() {
    }

    render() {
        console.log('props' + this.props);
        return  (
                <div className='Column content'>
                    <span onClick={this.moveLeft} className='arrow' style={{float: "left"}}>&lt;</span>
                    <span className='arrow edit' onClick={this.edit}>&#10000;</span>
                    <span className='arrow' onClick={this.edit}>&#10006;</span>
                    <span onClick={this.moveRight} className='arrow' style={{float: "right"}}>&gt;</span>
                    <h2>{this.props.column.name}</h2>
                    {this.props.column.tasks.map(b => <Task key={b._id} task={b} />)}
                    <AddTask/>
                </div>
        );
    }
}

export default Column;
