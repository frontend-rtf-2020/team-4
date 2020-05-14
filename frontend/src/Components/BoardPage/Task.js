import React from "react";

class Task extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className='Task'>
                <p>{this.props.task.name}</p>
            </div>
        );
    }
}

export default Task;
