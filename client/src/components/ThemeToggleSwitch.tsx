import React from 'react'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import styles from '../styles/sidebar.module.css'

const ThemeToggleSwitch = () => {
  return (
    <div className={`${styles.toggle} `}>
        <div className={`${styles.toggleActive} flexCenter`}>
            <LightModeOutlinedIcon/>
            <span>Ligth</span>
        </div>
        <div className={`${1} flexCenter`}>
            <Brightness2OutlinedIcon/>
            <span>Dark</span>
        </div>
    </div>
  )
}

export default ThemeToggleSwitch