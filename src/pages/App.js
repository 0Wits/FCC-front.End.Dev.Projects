import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import React from 'react';
import {
  Home,
  /*D3*/ 
    BarchartView, ChoroPletView, HeatmapView, ScatterPlotView, TreemapView,
  /*FrontEnd*/ 
    Calculator, DrumMachine, MarkDownPrev, Pomodoro, RandomQM,
} from './View_Indexes';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          {/* FrontEnd Projects */}
          <Route path="/markdownprev" element={<MarkDownPrev />} />
          <Route path="/drummachine" element={<DrumMachine />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/randomqm" element={<RandomQM />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
          {/* D3 Projects */}
          <Route path="/scatterplot" element={<ScatterPlotView />} />
          <Route path="/choropleth" element={<ChoroPletView />} />
          <Route path="/barchart" element={<BarchartView />} />
          <Route path="/treemap" element={<TreemapView />} />
          <Route path="/heatmap" element={<HeatmapView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
