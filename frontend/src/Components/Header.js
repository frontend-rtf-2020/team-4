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
                sessionStorage.setItem('user', null);
            })
    }
    render() {
        return (<>
            <span>{this.props.login}({this.props.email})</span>
            <span onClick={this.logout} className='link-button'>Logout</span>
        </>);
    }
}

export default class Header extends React.PureComponent {
   /* constructor() {
        super();
        this.state = {user: null};
    }*/
    render() {
        return (<header>
            <h2>
                <a href='/'>Project Template</a>
            </h2>
            {this.props.user ? <AuthorizedLinks login={this.props.user.login} email={this.props.user.email}/> : <NotAuthorizedLinks/>}
        </header>);
    }
}


//module.export = Header;
