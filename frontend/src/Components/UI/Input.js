import React, {createRef} from 'react'
import './Input.css'

class Input extends React.Component {
    constructor() {
        super();
        this.Field = createRef();
    }
    getValue()
    {
        return this.Field.current.value;
    }

    clickField = event => {
        event.preventDefault();
        event.stopPropagation();
    };
    render() {
        const inputType = this.props.type || 'text';
        return (
            <div className='Input'>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                {this.props.mail ?
                    <input
                        pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                        required="true"
                        onClick={this.clickField}
                        ref={this.Field}
                        placeholder={this.props.label}
                        type={inputType}
                        id={this.props.id}
                        value={this.props.value}
                        onChange={this.props.onChange}/>
                    :
                    <input
                        onClick={this.clickField}
                        ref={this.Field}
                        required="true"
                        placeholder={this.props.label}
                        type={inputType}
                        id={this.props.id}
                        value={this.props.value}
                        onChange={this.props.onChange}/>
                }
                <span>{this.props.errorMessage}</span>
            </div>
        )
    }
}

export default Input
