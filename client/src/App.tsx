import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { ThemeProvider } from './context/ThemeContext';
import Dashboard from './views/Dashboard';
import Jobs from './views/Jobs';

function App() {
  return (
    <div className='App'>
      <ThemeProvider>
      <Router>
        <Sidebar/>
        <Routes>
        <Route path='/' element={<Jobs/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
      </ThemeProvider>

    </div>
  );
}

export default App;

