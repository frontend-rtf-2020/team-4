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
                email: this.emailField.current.getValue(),
                username:this.usernameField.current.getValue(),
                password: this.passwordField.current.getValue()
            })
        }).then(res => res.json()).then(res => {
            if(res.err)
                alert(res.err.message);
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
                    <Input ref={this.usernameField} label="login" />
                    <Input ref={this.emailField} label="email" type='email'/>
                    <Input ref={this.passwordField}  label="password" type='password'/>
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
