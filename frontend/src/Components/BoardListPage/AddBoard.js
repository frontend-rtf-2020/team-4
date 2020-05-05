import React from "react";
import Input from "../UI/Input";

export default class AddBoard extends React.PureComponent {
    constructor() {
        super();
        this.state = { adding: false }
    }
    onAdd = () =>
        this.setState({ adding: true });

    cancel = event => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({adding: false});
    };
    getAddingForm = () => (
        <>
            <h3>Add new board</h3>
            <Input label='Board name'/>
            <Input label='Board description'/>
            <button onClick={e => this.props.addBoard("")}>Add</button>
            <button onClick={this.cancel}>Cancel</button>
        </>
    );
    render() {
        return (<div onClick={this.onAdd} className={this.state.adding ? 'content board' : 'content board add'}>
            {this.state.adding ? this.getAddingForm() : '+'}
        </div>);
    }
}
