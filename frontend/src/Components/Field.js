import React, {createRef} from "react";

export default class Field extends React.PureComponent {
    onSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        this.props.onEdit(this.props.name, this.inputRef.current.value);
        this.cancel(event);
    };
    constructor() {
        super();
        this.state = {editing: false};
        this.inputRef = createRef();
    }
    componentDidUpdate(prevProps , prevState , snapshot) {
        console.log(this.inputRef);
        if(this.state.editing)
            this.inputRef.current.value = this.props.children;
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
                    <input ref={this.inputRef} onClick={event => event.stopPropagation()} placeholder={this.props.description} />
                    <button className='editButton' onClick={this.onSubmit}>Submit</button>
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

