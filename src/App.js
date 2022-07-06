import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Form from './components/Form';
import Tournament from './components/Tournament1';
import Footer from './components/Footer';
import AddPlayers from './components/AddPlayers';
function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/new' element={<Form/>}/>
        <Route path='/tournaments/:id' element={<Tournament/>}/>
        <Route path='/tournaments/addplayers/:id' element={<AddPlayers/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}


export default App;
