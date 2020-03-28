import React from "react";
import './Forms.css'
import Input from './UI/Input.js'

export default class Registration extends React.Component{
    registerHandler = () => {

    };
    render (){
        return(
            <div className="FormBlock">
                <div>
                    <h1>Registration</h1>
                </div>
                <form className="Form" action='/registration' method='post'>
                    <Input label="login"/>
                    <Input label="email" type='email'/>
                    <Input label="password" type='password'/>
                    <button
                        type="success"
                        onClick={this.registerHandler}>
                     Sign up
                    </button>
                </form>
            </div>
        )
    }
}
