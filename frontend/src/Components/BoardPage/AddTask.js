import * as React from "react";

export default class AddTask extends React.Component {
    constructor() {
        super();
        this.state = { adding: false };
        //this.formRef = React.createRef();
    }
    onSubmit = e => {
        //alert(e.target.parentElement.getElementsByTagName('select')[0].value);
        const inputs = e.target.parentElement.getElementsByTagName('input');
        const name = inputs[0].value;
        const description = inputs[1].value;
        const date = inputs[2].value;
        const selects = e.target.parentElement.getElementsByTagName('select');
        const worker = selects[0].selectedOptions[0].value;
        this.props.onSubmit(name, worker, description, date);
        this.cancel(e);
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
            <input name='name' placeholder='Name'/>
            <select name='worker'>
                {this.props.members.map(m => <option value={m._id} key={m.login}>{m.login}</option>)}
            </select>
            <input name='description' placeholder='Description'/>
            <br/>
            <b>Do before:</b>
            <br/>
            <input name='date' type='date' />
            <br/>
            <button onClick={this.onSubmit}>Submit</button>
            <button onClick={this.cancel}>Cancel</button>
        </>
    );
    render() {
        console.log(this.props.members);
        return <div className='Task my-add'  onClick={this.add}>
            {this.state.adding ? this.getAddingForm() : '+'}
        </div>
    }
}
