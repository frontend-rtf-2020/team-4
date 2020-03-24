import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';


function App() {
  return (
    <div className="App">
        <Header/>
        <div>
            <h1>Tema 4:</h1>
            <ol>
                <li>Кальская Юлия</li>
                <li>Лукьянов Андрей</li>
                <li>Сатункин Владимир</li>
                <li>Ткачук Денис</li>
            </ol>
        </div>
        <Footer/>
    </div>
  );
}

export default App;
