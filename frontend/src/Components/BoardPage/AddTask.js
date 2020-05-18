import * as React from "react";
import Input from "../UI/Input";


export default class AddTask extends React.Component {
    constructor() {
        super();
        this.state = { adding: false }
    }

    add = () =>
        this.setState({ adding: true });
    cancel = event => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({adding: false});
    };
    getAddingForm = () => (
        <>
            <h3>Add task</h3>
            <Input label='Name'/>
            <Input label='Participant'/>
            <Input type='date' label='Date'/>
            <button onClick={e => this.props.addBoard("")}>Add</button>
            <button onClick={this.cancel}>Cancel</button>
        </>
    );
    render() {
        return <div className='Task my-add'  onClick={this.add}>
            {this.state.adding ? this.getAddingForm() : '+'}
        </div>
    }
}
