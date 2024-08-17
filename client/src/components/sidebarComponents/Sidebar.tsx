import React, { useState } from 'react';
import styles from '../../styles/sidebar.module.css';
import Logo from './Logo';
import NavButton from './NavButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ThemeToggleSwitch from './ThemeToggleSwitch';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ProfileAvatar from './ProfileAvatar';
import { BreakLine } from './BreakLine';
import { useNavigate } from 'react-router-dom';
import { ISidebar } from '../../interface/props';




const Sidebar = ({setModalOpen}:ISidebar) => {
  const Navigate = useNavigate();

  const handleNavigation = (path: string) => {
    Navigate(path);
  };



  return (
    <div className={styles.sidebarMain}>
      <Logo />
      {BreakLine}
      <NavButton text="Jobs" Icon={WorkOutlineOutlinedIcon} path="/" onClick={handleNavigation} />
      <NavButton text="Dashboard" Icon={GridViewOutlinedIcon} path="/dashboard" onClick={handleNavigation} />
      <NavButton text="Notifications" Icon={NotificationsActiveOutlinedIcon} path="/notifications" onClick={handleNavigation} />
      <NavButton text="Chats" Icon={ChatBubbleOutlineOutlinedIcon} path="/chats" onClick={handleNavigation} />
      {BreakLine}
      <NavButton text="Info" Icon={InfoOutlinedIcon} path="/info" onClick={handleNavigation} />
      <NavButton text="Settings" Icon={SettingsOutlinedIcon} path="/settings" onClick={handleNavigation} />
      <ThemeToggleSwitch />
      <ProfileAvatar setModalOpen={setModalOpen}/>
    </div>
  );
};

export default Sidebar;
