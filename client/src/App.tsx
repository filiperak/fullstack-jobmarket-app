import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Sidebar from './components/sidebarComponents/Sidebar';
import { ThemeProvider } from './context/ThemeContext';
import Dashboard from './views/Dashboard';
import Jobs from './views/Jobs';
import LoginModal from './components/loginModal/LoginModal';
import { UserContextProvider } from './context/UserContext';
import SingleJob from './views/SingleJob';
import { JobContext, JobContextProvider } from './context/JobContext';
import InfoMsg from './components/InfoMsg';

function App() {
  const [isModel,setIsModel] = useState<boolean>(false)
  const toggleModal = () => {
    setIsModel((prev) => !prev);
  };
  const {jobState} = useContext(JobContext)
  const {infoMsg} = jobState

  return (
    <div className='App'>
      <ThemeProvider>
      <UserContextProvider>
      <JobContextProvider>
      <Router>
        <Sidebar setModalOpen={toggleModal}/>
        <LoginModal open={isModel} setModalOpen={toggleModal}/>
        {typeof(infoMsg) !== null && <InfoMsg/>}

        <Routes>
        <Route path='/' element={<Jobs/>}/>
        <Route path='job/:jobId' element={<SingleJob/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
      </JobContextProvider>
      </UserContextProvider>
      </ThemeProvider>

    </div>
  );
}

export default App;

