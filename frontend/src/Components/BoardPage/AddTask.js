import * as React from "react";
import Input from "../UI/Input";


export default class AddTask extends React.Component {
    constructor() {
        super();
        this.state = { adding: false }
    }
    onSubmit = e => {
        alert(/*document.getElementById('s').value)*/e.target.parentElement.getElementsByTagName('select')[0].value);
        this.props.onSubmit();
    };
    add = () =>
        this.setState({ adding: true });
    cancel = event => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({adding: false});
    };
    getAddingForm = () => (
        <>
            <h4>Add task</h4>
            <input placeholder='Name'/>
            <select>
                {this.props.members.map(m => <option key={m.login}>{m.login}</option>)}
            </select>
            <input placeholder='Description'/>
            <br/>
            <b>Do before:</b>
            <br/>
            <input type='date' />
            <br/>
            <button onClick={this.onSubmit}>Submit</button>
            <button onClick={this.cancel}>Cancel</button>
        </>
    );
    render() {
        return <div className='Task my-add'  onClick={this.add}>
            {this.state.adding ? this.getAddingForm() : '+'}
        </div>
    }
}
