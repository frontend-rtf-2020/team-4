import React from "react";
import './Forms.css'
import $ from 'jquery';
import Input from './UI/Input.js'

export default class Registration extends React.Component{
    registerHandler = (event) => {
        console.log('send');
        event.preventDefault();
        console.log('send');
        fetch('/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: $('emailField').value,
                username: $('usernameField').value,
                password: $('passwordField').value
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
                <form className="Form">
                    <Input label="login"/>
                    <Input label="email" type='email'/>
                    <Input label="password" type='password'/>
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
