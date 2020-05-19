import React from "react";
import Input from "./UI/Input";

export default class Field extends React.PureComponent {
    click = event => {
        event.preventDefault();
        event.stopPropagation();
    };
    constructor() {
        super();
        this.state = {editing: false}
    }
    onEdit = event => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({editing: true});
    };

    cancel = event => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({editing: false});
    };
    render() {
        return (<div className='field'>
            {
                this.state.editing ?
                <>
                    <input value={this.props.children} placeholder={this.props.description} />
                    <button className='editButton' onClick={this.click}>Submit</button>
                    <button className='editButton' onClick={this.cancel}>Cancel</button>
                </> :
                <>
                    {this.props.children}
                    <span className='edit arrow' onClick={e => this.onEdit(e)}>&#10000;</span>
                </>
            }
        </div>)
    }
}

