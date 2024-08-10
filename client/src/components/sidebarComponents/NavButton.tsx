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
  const isActive = location.pathname === path;

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
