import React from 'react';
import './App.css';
import Topbar from './components/Topbar/Topbar';
import MainPage from './components/MainPage/MainPage'
import Footer from './components/Footer/Footer'


function App() {
  return (
    <div className="App">
      <Topbar></Topbar>
      <MainPage></MainPage>
      <Footer></Footer>
    </div>
  );
}

export default App;
