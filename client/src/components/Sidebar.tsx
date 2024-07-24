import React from 'react'
import styles from '../styles/sidebar.module.css'
import Logo from './Logo'
import NavButton from './NavButton'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ThemeToggleSwitch from './ThemeToggleSwitch';
import ProfileAvatar from './ProfileAvatar';
import { BreakLine } from './BreakLine';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const Navigate = useNavigate()
  return (
    <div className={styles.sidebarMain}>
        <Logo/>
        {BreakLine}
        <NavButton text="Dashboard" Icon={HomeOutlinedIcon} onclick={() => Navigate('/')}/>
        <NavButton text="Jobs" Icon={WorkOutlineOutlinedIcon}/>
        <NavButton text="Notifications" Icon={NotificationsActiveOutlinedIcon}/>
        <NavButton text="Chats" Icon={ChatBubbleOutlineOutlinedIcon}/>
        {BreakLine}
        <NavButton text="Info" Icon={InfoOutlinedIcon}/>
        <NavButton text="Settings" Icon={SettingsOutlinedIcon}/>

        <ThemeToggleSwitch/>
        <ProfileAvatar/>
    </div>
  )
}

export default Sidebar