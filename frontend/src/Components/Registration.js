import React from "react";
import './content.css';
import Input from './UI/Input.js';

export default class Registration extends React.Component {

    constructor() {
        super();
        this.usernameField = React.createRef();
        this.emailField = React.createRef();
        this.passwordField = React.createRef();
        this.confirmField = React.createRef();
        this.state = {errorMessage: ""}
    }

    registerHandler = (event) => {
        event.preventDefault();
        const username = this.usernameField.current.getValue(),
              password = this.passwordField.current.getValue(),
                confirm = this.confirmField.current.getValue();
        if(confirm !== password)
        {
            this.setState({errorMessage: "Password and its confirm are different "});
            return;
        }
        if(username.indexOf('@') !== -1)
        {
            this.setState({errorMessage: "Login must not contain symbol @"});
            return;
        }
        fetch('/api/reg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.emailField.current.getValue(),
                username: username,
                password: password
            })
        }).then(res => res.json()).then(res => {
            console.log(res);
            if(res.error)
                this.setState({errorMessage: res.error.message || res.error});
            else {
                alert(res.result);
                window.location.href = '/';
            }
        });

     };

    render () {
        return(
            <>
                <div>
                    <h1>Registration</h1>
                </div>
                <form className="content">
                    <Input ref={this.usernameField} label="Login" />
                    <Input ref={this.emailField} label="Email" type='email'/>
                    <Input ref={this.passwordField}  label="Password" type='password'/>
                    <Input ref={this.confirmField}  label="Password confirm" type='password'/>
                    <div className='errorMessage'>{this.state.errorMessage}</div>
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
