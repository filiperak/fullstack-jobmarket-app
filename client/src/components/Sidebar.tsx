import React from 'react'
import styles from '../styles/sidebar.module.css'
import Logo from './Logo'

const Sidebar = () => {
  return (
    <div className={styles.sidebarMain}>
        <Logo/>
    </div>
  )
}

export default Sidebar