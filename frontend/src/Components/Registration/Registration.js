import React from "react";
import classes from './Registration.css'
import Input from '../UI/Input.js'

export default class Registration extends React.Component{
    registrHandler = () => {
        
    }
    render (){
        return(
            <div className="Reg">
                <div>
                    <h1>Registration</h1>
                </div>
                <form className="RegForm">
                    <Input label="login"/>    
                    <Input label="email"/>
                    <Input label="password"/>
                    <button
                        type="success"
                        onClick={this.registrHandler}
                    >
                     Sign up
                    </button>
                </form>
            </div>
        )
    }
}
