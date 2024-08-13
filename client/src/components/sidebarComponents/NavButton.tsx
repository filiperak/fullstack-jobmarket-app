import React, { ElementType } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import styles from '../../styles/sidebar.module.css';
import { useLocation } from 'react-router-dom';

interface Props {
  Icon: ElementType<SvgIconProps>;
  text: string;
  path: string;
  onClick: (path: string) => void;
}

const NavButton = ({ Icon, text, path, onClick }: Props) => {
  const location = useLocation();
  const isJobsActive = location.pathname === '/' || location.pathname.startsWith('/job');
  const isActive = isJobsActive && path === '/' || location.pathname === path

  return (
    <div
      className={`${styles.navButtons} flexLeft ${isActive ? styles.active : ''}`}
      onClick={() => onClick(path)}
    >
      <Icon />
      <p>{text}</p>
    </div>
  );
};

export default NavButton;
