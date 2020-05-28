import React from "react";
import Input from "../UI/Input";

export default class AddBoard extends React.PureComponent {
    constructor() {
        super();
        this.state = { adding: false };
        this.name = React.createRef();
        this.descr = React.createRef();
    }

    onAdd = () =>
        this.setState({adding: true});
    cancel = event => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({adding: false});
    };

    onAddingBoard = event => {
        this.cancel(event);
        this.props.addBoard(this.name.current.getValue(), this.descr.current.getValue());
    };

    getAddingForm = () => (
        <>
            <h3>Add new board</h3>
            <Input ref={this.name} label='Board name'/>
            <Input ref={this.descr} label='Board description'/>
            <button onClick={this.onAddingBoard} >Add</button>
            <button onClick={this.cancel}>Cancel</button>
        </>
    );
    render() {
        return (<div onClick={this.onAdd} className={this.state.adding ? 'content board' : 'content board add'}>
            {this.state.adding ? this.getAddingForm() : '+'}
        </div>);
    }
}
