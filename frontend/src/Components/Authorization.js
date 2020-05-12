import React from "react";
import './content.css';

import Input from './UI/Input.js';

export default class Authorization extends React.Component {

    loginHandler = (event) => {
        console.log('send');
        event.preventDefault();
        console.log('send');
        fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.identifierField.current.getValue(),
                password: this.passField.current.getValue()
            })
        }).then(res => res.json()).then(res => {
            if(res.error)
                alert(res.error);
            else {
                alert(res.result);
                window.location.href = '/';
            }
        });

    };

    constructor() {
        super();
        this.identifierField = React.createRef();
        this.passField = React.createRef();
    }

    render () {
        return(
            <>
                <h1>Authorization</h1>
                <form  className="content">
                    <Input label="login/email" ref={this.identifierField} />
                    <Input label="password"  ref={this.passField}  type='password'/>
                    <button
                        type="success"
                        onClick={this.loginHandler}>
                        Sign in
                    </button>
                </form>
            </>
        )
    }
}
