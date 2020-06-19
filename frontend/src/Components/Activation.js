import React from "react";

export default class Activation extends React.Component {

    constructor() {
        super();
        const params = new URLSearchParams(window.location.search);
        this.state = { error: params.get('error') ? decodeURI(params.get('error')) : null,
            result: params.get("result") ? decodeURI(params.get("result")) : null, activate: params.get("activate") }
    }

    render() {
        const needReactivate = this.state.error && this.state.activate;
        return (<div className='content'>
            <h2>{this.state.error || this.state.result || "Default message"}</h2>
            <form method='get' action={needReactivate ? '/api/reactivate' : '/'}>
                {needReactivate ? <input type='hidden' value={this.state.activate} name='activate'/> : ''}
                <button>{needReactivate ? 'Reactivate' : 'Ok'}</button>
            </form>
        </div>)
    }

}
