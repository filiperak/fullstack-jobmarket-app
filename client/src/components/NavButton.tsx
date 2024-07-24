import React, { ElementType } from 'react'
import { SvgIconProps } from '@mui/material/SvgIcon';
import styles from '../styles/sidebar.module.css'
interface Props {
    Icon: ElementType<SvgIconProps>   
    text:string
    onclick?: () => void
}

const NavButton = ({Icon,text,onclick}:Props) => {
  return (
    <div className={`${styles.navButtons} flexLeft`}>
        <Icon/>
        <p>{text}</p>
    </div>
  )
}

export default NavButton