import React from "react";

const NotAuthorizedLinks = props => (<>
    <a href='/auth' className='link-button'>Authorization</a>
    <a href='/reg' className='link-button'>Registration</a>
</>);


class AuthorizedLinks extends React.Component {
    logout() {
        fetch('/api/logout')
            .then(r => r.json())
            .then(r => {
                if(r.error)
                    alert(r.error);
                else {
                    alert(r.result);
                    window.location.href = '/';
                }
            })
    }
    render() {
        return (<>
            <span>{this.props.login}({this.props.email})</span>
            <span onClick={this.logout} className='link-button'>Logout</span>
        </>);
    }
}

export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {user: null};
    }

    componentDidMount() {
        fetch('/api/get_user_data')
            .then(r => r.json())
            .then(r => {
                if(r.error)
                    console.log(r.error);
                else
                    this.setState({user: r});//TODO:save to context
            })
            .catch(e => console.log(e))
    }


    render() {
        return (<header>
            <h2>
                <a href='/'>Project Template</a>
            </h2>
            {this.state.user ? <AuthorizedLinks login={this.state.user.login} email={this.state.user.email}/> : <NotAuthorizedLinks/>}
        </header>);
    }
}


//module.export = Header;
