import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <div>
      <ThemeProvider>
      <Router>
        <Sidebar/>
      </Router>
      </ThemeProvider>

    </div>
  );
}

export default App;

