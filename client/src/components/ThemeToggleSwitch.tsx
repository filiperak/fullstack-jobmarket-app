import React, { useContext, useState } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import Brightness2OutlinedIcon from "@mui/icons-material/Brightness2Outlined";
import styles from "../styles/sidebar.module.css";
import { ThemeContext, useTheme } from "../context/ThemeContext";

const ThemeToggleSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  console.log(theme);

  return (
    <div className={`${styles.toggle} `}>
      <div
        className={`flexCenter ${theme === "light" ? styles.toggleActive : ""}`}
        onClick={() => toggleTheme()}
      >
        <LightModeOutlinedIcon />
        <span >Ligth</span>
      </div>
      <div
        className={`flexCenter ${theme === "dark" ? styles.toggleActive : ""}`}
        onClick={() => toggleTheme()}
      >
        <Brightness2OutlinedIcon />
        <span>Dark</span>
      </div>
    </div>
  );
};

export default ThemeToggleSwitch;
