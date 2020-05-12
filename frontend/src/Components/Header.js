import React from "react";

const NotAuthorizedLinks = props => (<>
    <a href='/auth'>Authorization</a>
    <a href='/reg'>Registration</a>
</>);


const AuthorizedLinks = props => (<>
    <a href=''>{props.login}</a>
    <a href=''>Logout</a>
</>);

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
                    this.setState({user: r});
            })
            .catch(e => console.log(e))
    }

    render() {
        return (<header>
            <h2>
                Project Template
            </h2>
            {this.state.user ? <AuthorizedLinks login={this.state.user.login}/> : <NotAuthorizedLinks/>}
        </header>);
    }
}


//module.export = Header;
