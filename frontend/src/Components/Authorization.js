import React from "react";
import './Forms.css'

import Input from './UI/Input.js'

export default class Authorization extends React.Component{

    loginHandler = event => {
        //event.preventDefault()
    };

    render (){
        return(
            <>
                <h1>Authorization</h1>
                <form  className="Form" action='/authorize' method='post'>
                    <Input label="login/email"/>
                    <Input label="password" type='password'/>
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
