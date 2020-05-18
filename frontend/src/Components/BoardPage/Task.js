import React from "react";

class Task extends React.Component {

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

    render() {
        return (
            <div className={this.getClass()}>
                <h4>{this.props.task.name}</h4>
                {new Date(this.props.task.endDate).toDateString()}
                <br/>
                Worker: {this.props.task.worker.login}
                <br/>
                Done: <input type='checkbox' onChange={this.sendDone} value={this.props.task.done} />
            </div>
        );
    }
}

export default Task;
