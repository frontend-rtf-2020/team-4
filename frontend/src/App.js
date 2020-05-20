import React from 'react';
import './App.css';
import {BrowserRouter , Route , Switch} from 'react-router-dom'
import Header from './Components/Header';
import Footer from './Components/Footer';
import BoardList from "./Components/BoardListPage/BoardList";
import {StartComponent} from "./Components/StartComponent";
import Authorization from "./Components/Authorization";
import Registration from "./Components/Registration";
import Board from "./Components/BoardPage/Board";
import Activation from "./Components/Activation";

//const LoginContext = React.createContext({logged: false});

const NotFound = props => (<div className='content'><h1>The page not found</h1></div>);

const UnAuthorizedAccess = props => (<div className='content'><h1>This page is for authorized users only.
    <br/> Please use buttons at the right top corner to authorize</h1></div>);

class App extends React.Component {

    constructor() {
        super();
        this.state = {user: JSON.parse(sessionStorage.getItem('user'))};
    }

    componentDidMount() {
        fetch('/api/get_user_data')
            .then(r => r.json())
            .then(r => {
                if(r.error) {
                    console.log(r.error);
                    sessionStorage.setItem('user', null);
                    this.setState({user: null});
                }
                else {/**/
                    this.setState({user: r});
                    sessionStorage.setItem('user', JSON.stringify(r));
                }
            })
            .catch(e => console.log(e))
    }

    render() {
        return (
            <div className="App">
                <Header user={this.state.user}/>
                    <div className='mainPart'>
                        <BrowserRouter>
                            <Switch>
                                <Route path="/item/:id" component={this.state.user ? Board : UnAuthorizedAccess}/>
                                <Route path="/list" component={this.state.user ? BoardList : UnAuthorizedAccess}  />
                                <Route path="/auth" component={Authorization}  />
                                <Route path="/reg"  component={Registration}  />
                                <Route path='/activation' component={Activation} />
                                <Route exact path='/' component={StartComponent}/>
                                <NotFound/>
                            </Switch>
                        </BrowserRouter>
                    </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
