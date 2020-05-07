import React from "react";
import Input from "../UI/Input";

export default class Field extends React.PureComponent {
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
                    <Input value={this.props.children} label={this.props.description} />
                    <button className='editButton'>Submit</button>
                    <button className='editButton' onClick={this.cancel}>Cancel</button>
                </> :
                <>
                    {this.props.children}
                    <button className='editButton' onClick={e => this.onEdit(e)}>
                    </button>
                </>
            }
        </div>)
    }
}

