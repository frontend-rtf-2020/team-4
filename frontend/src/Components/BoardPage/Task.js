import React from "react";
import AddTask from "./AddTask";

class Task extends React.Component {

    constructor() {
        super();
        this.state = {editing: false};
        this.formRef = React.createRef();
    }

    sendDone = event =>
        //TODO:send
        this.props.toggleDoneTask(this.props.task._id, event.target.checked);
        //console.log(event.target.checked)

    getClass = () => {
        const date = Date.parse(this.props.task.endDate).valueOf(), now = Date.now().valueOf();
        if( !this.props.task.done && date < now)
            return 'Task overdue-task';
        else if(!this.props.task.done && date - now <= 24*60*60*1000)
            return 'Task urgent-task';
        else return 'Task';
    };

    initEditForm = () => {
        const inputs = this.formRef.current.getElementsByTagName('input');
        inputs[0].value = this.props.task.name;
        inputs[1].value = this.props.task.description;
        inputs[2].value = this.props.task.endDate;//TODO: fix
        const selects = this.formRef.current.getElementsByTagName('select');
        selects[0].value = this.props.task.workerId._id;
        selects[1].value = this.props.columnId;
    };

    edit = () =>
        this.setState({editing: true}, this.initEditForm);

    cancel = event => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({editing: false});
    };

    delete = event =>
        this.props.onDelete(this.props.id);

    onSubmit = e => {
        const inputs = e.target.parentElement.getElementsByTagName('input');
        const name = inputs[0].value;
        const description = inputs[1].value;
        const date = inputs[2].value;
        const selects = e.target.parentElement.getElementsByTagName('select');
        const worker = selects[0].value;
        const column = selects[1].value;
        this.props.onEdit(this.props.task._id, name, worker, description, date, column);
        this.cancel(e);
        //To obtain selected column id use: columnSelect.selectedOptions[0].value
    };

    render() {
        //console.log(this.props.task.endDate)
        const date = new Date(Date.parse(this.props.task.endDate));
        return (
            <div className={this.getClass()} ref={this.formRef}>
                {this.state.editing ?
                    <>
                        <h4>Edit task</h4>
                        <input placeholder='Name'/>
                        <select>
                            {this.props.members.map(m => <option value={m._id} key={m.login}>{m.login}</option>)}
                        </select>
                        <input placeholder='Description'/>
                        <br/>
                        <b>Do before:</b>
                        <br/>
                        <input type='date'/>
                        <br/>
                        <select>
                            {this.props.columns.map(m => <option value={m._id} key={m._id}>{m.name}</option>)}
                        </select>
                        <br/>
                        <button className='editButton' onClick={this.onSubmit}>Submit</button>
                        <button className='editButton' onClick={this.cancel}>Cancel</button>
                    </> :
                    <>
                        <h4>
                            {this.props.task.name}
                            <span className='arrow edit' onClick={this.edit}>&#10000;</span>
                            <span className='arrow' onClick={this.delete}>&#10006;</span>
                        </h4>
                        {this.props.task.description}
                        <br/>
                        {/*{date.getDay()}.{date.getMonth() + 1}.{date.getFullYear()}*/}
                        {this.props.task.endDate}
                        <br/>
                        Worker: {this.props.task.workerId.login}
                        <br/>
                        Done: <input type='checkbox' onChange={this.sendDone} checked={this.props.task.done}/>
                    </>}
            </div>
        );
    }
}

//const ColumnOption = props => (<option>{props.children}</option>);

export default Task;
