import React from 'react'
import './Input.css'

const Input = (props) => {
    const inputType = props.type || 'text';
    //const cls = [classes.Input];
    ///const htmlFor= `${inputType}-${Math.random()}`;

    return(
        <div /*className={cls.join(' ')}*/ className='Input'>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                placeholder={props.label}
                type={inputType}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
            />
            <span>{props.errorMessage}</span>
        </div>
    )
}

export default Input
