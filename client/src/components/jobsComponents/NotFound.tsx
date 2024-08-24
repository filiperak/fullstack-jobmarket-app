import React from 'react'
import globalStyles from '../../styles/app.module.css'
import SearchOffIcon from '@mui/icons-material/SearchOff';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <div className={globalStyles.views}>
        <NotFoundContainer>
            <SearchOffIcon/>
            <p>No jobs found...</p>
        </NotFoundContainer>
    </div>
  )
}
const NotFoundContainer = styled.div`
    display: flex;
    align-items: center;
    margin: var(--app-margin) auto;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    font-size: 1.3rem;
    top: 5%;
`;
export default NotFound