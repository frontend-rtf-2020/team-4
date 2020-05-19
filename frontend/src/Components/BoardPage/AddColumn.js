import * as React from "react";
import Input from "../UI/Input";


export default class AddColumn extends React.Component {
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
        <div className='content Column my-add'>
            <h3>Add column</h3>
            <input placeholder='Name'/>
            <button onClick={e => this.props.addBoard("")}>Add</button>
            <button onClick={this.cancel}>Cancel</button>
        </div>
    );
    render() {
        return this.state.adding ? this.getAddingForm() : <div onClick={this.add} className='content Column add-column my-add'>+</div>
    }
}
