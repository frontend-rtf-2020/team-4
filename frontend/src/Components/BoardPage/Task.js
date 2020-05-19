import React from "react";
import AddTask from "./AddTask";

class Task extends React.Component {

    constructor() {
        super();
        this.state = {editing: false};
    }

    componentDidMount() {
    }

    sendDone = event => {
        //TODO:send
        console.log(event.target.checked)
    };

    getClass = () => {
        const date = new Date(this.props.task.endDate).valueOf(), now = Date.now().valueOf();
        if( !this.props.task.done && date < now)
            return 'Task overdue-task';
        else if(!this.props.task.done && date - now <= 24*60*60*1000)
            return 'Task urgent-task';
        else return 'Task';
    };

    edit = () => {
        this.setState({...this.state, editing: true});
    };

    cancel = event => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({...this.state, editing: false});
    };

    render() {
        return (
            <div className={this.getClass()}>
                {this.state.editing ?
                    <>
                        <h4>Add task</h4>
                        <input placeholder='Name' value={this.props.task.name}/>
                        <select>
                            {this.props.members.map(m => <option key={m.login}>{m.login}</option>)}
                        </select>
                        <input placeholder='Description' value={this.props.task.description}/>
                        <br/>
                        <b>Do before:</b>
                        <br/>
                        <input type='date'/>
                        <br/>
                        <button onClick={this.onSubmit}>Submit</button>
                        <button onClick={this.cancel}>Cancel</button>
                    </> :
                    <>
                        <h4>
                            {this.props.task.name}
                            <span className='arrow edit' onClick={this.edit}>&#10000;</span>
                        </h4>
                        {new Date(this.props.task.endDate).toDateString()}
                        <br/>
                        Worker: {this.props.task.worker.login}
                        <br/>
                        Done: <input type='checkbox' onChange={this.sendDone} value={this.props.task.done}/>
                    </>}
            </div>
        );
    }
}

export default Task;
