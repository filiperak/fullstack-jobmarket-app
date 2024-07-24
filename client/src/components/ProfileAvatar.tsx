import { Avatar } from '@mui/material'
import React from 'react'
import styles from '../styles/sidebar.module.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ProfileAvatar = () => {
  return (
    <div className={styles.avatarCntainer}>
        <Avatar/>
        <div>
            <p>username</p>
            <p>savobacic@gmail.com</p>
        </div>
        <MoreVertIcon/>
    </div>
  )
}

export default ProfileAvatar