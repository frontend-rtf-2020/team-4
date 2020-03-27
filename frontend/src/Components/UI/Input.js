import React from 'react'
import classes from './Input.css'

const Input = (props) => {
    const inputType = props.type || 'text'
    const cls = [classes.Input]
    const htmlFor= `${inputType}-${Math.random()}`


    return(
        <div className={cls.join(' ')}>
            <lable htmlFor={htmlFor}>{props.lable}</lable>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            <span>{props.errorMessage}</span>
        </div>
    )
}

export default Input