import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div>
      <Router>
        <Sidebar/>
      </Router>
    </div>
  );
}

export default App;

