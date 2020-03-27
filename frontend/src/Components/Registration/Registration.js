import React from "react";
import classes from './Registration.css'
import Input from '../UI/Input.js'

export default class Registration extends React.Component{
    render (){
        return(
            <div className="Reg">
                <div>
                    <h1>Регистрация</h1>
                </div>
                <form className="RegForm">
                    <Input label="login"/>    
                    <Input label="email"/>
                    <Input label="password"/>
                </form>

                <button
                    type="success"
                    onClick={this.loginHandler}
                >
                    Зарегистрироваться
                </button>
            </div>
        )
    }
}
