import React from "react";

export class StartComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className='content start'>
                <h1>Welcome!</h1>
                <br/>
                <h3><a href='/list'>Board list</a></h3>
            </div>
        );
    }
}
