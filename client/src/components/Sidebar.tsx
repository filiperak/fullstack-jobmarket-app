import React from 'react'
import styles from '../styles/sidebar.module.css'
import Logo from './Logo'
import NavButton from './NavButton'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ThemeToggleSwitch from './ThemeToggleSwitch';
import ProfileAvatar from './ProfileAvatar';
const Sidebar = () => {
  return (
    <div className={styles.sidebarMain}>
        <Logo/>

        <NavButton text="Home" Icon={HomeOutlinedIcon}/>
        <NavButton text="Home" Icon={HomeOutlinedIcon}/>
        <NavButton text="Home" Icon={HomeOutlinedIcon}/>
        <NavButton text="Home" Icon={HomeOutlinedIcon}/>

        <ThemeToggleSwitch/>
        <ProfileAvatar/>
    </div>
  )
}

export default Sidebar