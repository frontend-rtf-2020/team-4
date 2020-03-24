import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';


class App extends React.Component {
    constructor() {
        super();
        this.state = {data: ""};
    }
    componentDidMount() {
        fetch('/api/test')
            .then(d => d.text())
            .then(t => this.setState({data: t}));
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div>
                    <h1>Team 4:</h1>
                    <ol>
                        <li>Кальская Юлия</li>
                        <li>Лукьянов Андрей</li>
                        <li>Сатункин Владимир</li>
                        <li>Ткачук Денис</li>
                        {this.state.data}
                    </ol>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
