import { Avatar } from '@mui/material'
import React from 'react'
import styles from '../../styles/sidebar.module.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ISidebar } from '../../interface/props';

const ProfileAvatar = ({setModalOpen}:ISidebar) => {
  return (
    <div 
    onClick={() => setModalOpen()}
    className={styles.avatarCntainer}>
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