import React from "react";
import globalStyles from "../styles/app.module.css";
import styled from "styled-components";
import { ReactComponent as Gears } from "../assets/Gears.svg";

const Settings = () => {
  return (
    <div className={globalStyles.views}>
      <SettingsWrapper>
        <Gears />
        <span>Settings are under construction</span>
      </SettingsWrapper>
    </div>
  );
};
const SettingsWrapper = styled.div`
  margin: var(--app-margin);
  border-radius: var(--app-border-radius);
  height: 98%;
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > svg {
    height: 200px;
  }
  >span{
    font-size: 1.2rem;
    font-weight: 800;
  }
`;

export default Settings;
