import React, { useState } from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Sidebar from './components/sidebarComponents/Sidebar';
import { ThemeProvider } from './context/ThemeContext';
import Dashboard from './views/Dashboard';
import Jobs from './views/Jobs';
import LoginModal from './components/loginModal/LoginModal';

function App() {
  const [isModel,setIsModel] = useState<boolean>(false)
  const toggleModal = () => {
    setIsModel((prev) => !prev);
  };
  return (
    <div className='App'>
      <ThemeProvider>
      <Router>
        <Sidebar setModalOpen={toggleModal}/>
        <LoginModal open={isModel} setModalOpen={toggleModal}/>

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

