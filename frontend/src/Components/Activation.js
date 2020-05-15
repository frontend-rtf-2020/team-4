import React from "react";

function parseQueryString(strQuery = window.location.search) {
    let strSearch   = strQuery.substr(1),
        strPattern  = /([^=]+)=([^&]+)&?/ig,
        arrMatch    = strPattern.exec(strSearch),
        objRes      = {};
    while (arrMatch != null) {
        objRes[arrMatch[1]] = arrMatch[2];
        arrMatch = strPattern.exec(strSearch);
    }
    return objRes;
}


export default class Activation extends React.Component {

    constructor() {
        super();
        const params = parseQueryString();
        this.state = { error: params.error, result: params.result, activate: params.activate }
    }

    render() {
        const needReactivate = this.state.error && this.state.activate;
        return (<div className='content'>
            <h2>{this.state.error || this.state.results || "Default message"}</h2>
            <form method='get' action={needReactivate ? '/api/reactivate' : '/'}>
                {needReactivate ? <input type='hidden' value={this.state.activate} name='activate'/> : ''}
                <button>{needReactivate ? 'Reactivate' : 'Ok'}</button>
            </form>
        </div>)
    }

}
