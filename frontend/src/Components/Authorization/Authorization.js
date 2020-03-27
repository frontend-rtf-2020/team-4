import React from "react";
import classes from './Authorization.css'
import Input from '../UI/Input.js'

export default class Autho extends React.Component{
    
    loginHandler = () => {

    }
    registrHandler = () => {
        
    }
    submitHandler = event => {
        event.preventDefault()
    }
      
    render (){
        return(
            <div className="Auth">
                <div>
                    <h1>Авторизация</h1>
                </div>
                <form onSubmit={this.submitHandler} className="AuthForm">
                <Input label="login/email"/>
                <Input label="password"/>
                </form>

                <button
                    type="success"
                    onClick={this.loginHandler}
                >
                    Войти
                </button>

            </div>
        )
    }
}