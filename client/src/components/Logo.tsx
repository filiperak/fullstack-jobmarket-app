import React from "react";
import HandymanIcon from '@mui/icons-material/Handyman';
import styles from '../styles/sidebar.module.css'
const Logo = () => {
  return (
    <div className={`${styles.SideBarLogo} flexCenter`}> 
        <HandymanIcon/>
        <div>
        <h2>Gig</h2>
        <h2>Works</h2>
        </div>
    </div>
  );
};

export default Logo;
