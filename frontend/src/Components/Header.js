import React from "react";

const NotAuthorizedLinks = props => (<>
    <a href='/auth' className='link-button'>Sign in</a>
    <a href='/reg' className='link-button'>Sign up</a>
</>);


class AuthorizedLinks extends React.Component {

    logout() {
        fetch('/api/logout')
            .then(r => r.json())
            .then(r => {
                if(r.error) {
                    alert(r.error);
                }
                else {
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

    render() {
        return (<header>
            <h2>
                <a href='/'>My task board</a>
            </h2>
            {this.props.user ? <AuthorizedLinks login={this.props.user.login} email={this.props.user.email}/> : <NotAuthorizedLinks/>}
        </header>);
    }
}


