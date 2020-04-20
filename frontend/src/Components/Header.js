import React from "react";

export default function Header(props) {
    return (<header>
        <h2>
            Project Template
        </h2>
        <div>
            <a href='/auth'>Authorization</a>
            <a href='/reg'>Registration</a>
        </div>
    </header>);
}

//module.export = Header;
