// src/pages/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Calculator from './Calculator';
import DrumMachine from './DrumMachine';
import MarkDownPrev from './MarkDownPrev';
import Pomodoro from './Pomodoro';
import RandomQM from './RandomQM';
import Navbar from '../components/navbar';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {
        //Rutas
      }
      <Routes>
        <Route path="/home"         element={<Home />} />
        <Route path="/calculator"   element={<Calculator />} />
        <Route path="/drummachine"  element={<DrumMachine />} />
        <Route path="/markdownprev" element={<MarkDownPrev />} />
        <Route path="/pomodoro"     element={<Pomodoro />} />
        <Route path="/randomqm"     element={<RandomQM />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
