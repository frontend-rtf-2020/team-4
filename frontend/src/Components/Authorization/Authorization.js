import React from "react";
import classes from './Authorization.css'
import Input from '../UI/Input.js'

export default class Authorization extends React.Component{
    
    loginHandler = () => {

    }

    submitHandler = event => {
        event.preventDefault()
    }
      
    render (){
        return(
            <div className="Auth">
                <div>
                    <h1>Authorization</h1>
                </div>
                <form onSubmit={this.submitHandler} className="AuthForm">
                    <Input label="login/email"/>
                    <Input label="password"/>
                    <button
                        type="success"
                        onClick={this.loginHandler}
                        
                    >
                        Sign in
                    </button>
                </form>
            </div>
        )
    }
}