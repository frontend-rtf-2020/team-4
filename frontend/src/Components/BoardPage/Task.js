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
        const date = Date.parse(this.props.task.endDate).valueOf(), now = Date.now().valueOf();
        if( !this.props.task.done && date < now)
            return 'Task overdue-task';
        else if(!this.props.task.done && date - now <= 24*60*60*1000)
            return 'Task urgent-task';
        else return 'Task';
    };

    edit = () => {
        this.setState({/*...this.state, */editing: true});
    };

    cancel = event => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({/*...this.state, */editing: false});
    };

    delete = event => {
        //TODO: Make deletion
        this.props.onDelete(this.props.id);
        alert("deletion")
    };

    onSubmit = event => {
        alert("send!");
        //To obtain selected column id use: columnSelect.selectedOptions[0].id
    };

    render() {
        const date = new Date(this.props.task.endDate);
        return (
            <div className={this.getClass()}>
                {this.state.editing ?
                    <>
                        <h4>Edit task</h4>
                        <input placeholder='Name' value={this.props.task.name}/>
                        <select value={this.props.task.workerId.login}>
                            {this.props.members.map(m => <option key={m.login}>{m.login}</option>)}
                        </select>
                        <input placeholder='Description' value={this.props.task.description}/>
                        <br/>
                        <b>Do before:</b>
                        <br/>
                        <input type='date'/>
                        <br/>
                        <select id='columnSelect'>
                            {this.props.columns.map(m => <option id={m._id} key={m._id}>{m.name}</option>)}
                        </select>
                        <br/>
                        <button onClick={this.onSubmit}>Submit</button>
                        <button onClick={this.cancel}>Cancel</button>
                    </> :
                    <>
                        <h4>
                            {this.props.task.name}
                            <span className='arrow edit' onClick={this.edit}>&#10000;</span>
                            <span className='arrow' onClick={this.delete}>&#10006;</span>
                        </h4>
                        {this.props.task.description}
                        <br/>
                        {date.getDay()}.{date.getMonth()}.{date.getFullYear()}
                        <br/>
                        Worker: {this.props.task.workerId.login}
                        <br/>
                        Done: <input type='checkbox' onChange={this.sendDone} value={this.props.task.done}/>
                    </>}
            </div>
        );
    }
}

//const ColumnOption = props => (<option>{props.children}</option>);

export default Task;
