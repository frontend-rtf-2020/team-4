import React from "react";
import './content.css';
import Input from './UI/Input.js';

export default class Registration extends React.Component{
    constructor() {
        super();
        this.usernameField = React.createRef();
        this.emailField = React.createRef();
        this.passwordField = React.createRef();
    }
    registerHandler = (event) => {
        console.log('send');
        event.preventDefault();
        console.log('send');
        fetch('/api/reg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.emailField.current.value,
                username:this.usernameField.current.value,
                password: this.passwordField.current.value
            })
        }).then(res => res.json()).then(res => {
            if(res.err)
                alert(res.err);
            else alert(res);
        });

     };

    render (){
        return(
            <>
                <div>
                    <h1>Registration</h1>
                </div>
                <form className="content">
                    <Input id="usernameField"  ref={this.usernameField} label="login" />
                    <Input id="emailField" ref={this.emailField} label="email" type='email'/>
                    <Input id="passwordField" ref={this.passwordField}  label="password" type='password'/>
                    <button
                        type="success"
                        onClick={this.registerHandler}>
                     Sign up
                    </button>
                </form>
            </>
        )
    }
}
