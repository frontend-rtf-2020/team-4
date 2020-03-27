import React from 'react';
import './App.css';
import {BrowserRouter , Route , Switch} from 'react-router-dom'
import Header from './Components/Header';
import Footer from './Components/Footer';
import BoardList from "./Components/BoardListPage/BoardList";
import BoardItem from "./Components/BoardListPage/BoardItem";
import {StartComponent} from "./Components/StartComponent";
import Autho from "./Components/Authorization/Authorization";
import Registration from "./Components/Registration/Registration";


class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <div>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/item" render={(props) => <BoardItem />}/>
                            <Route path="/list" render={(props) => <BoardList />} />
                            <Route path="/auth" render={(props) => <Autho />} />
                            <Route path="/reg" render={(props) => <Registration />} />
                            <Route path='/' component={StartComponent}/>
                        </Switch>
                    </BrowserRouter>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
