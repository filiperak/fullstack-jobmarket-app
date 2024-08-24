import React from 'react'
import globalStyles from '../styles/app.module.css'
import styled from 'styled-components'

const Notifications = () => {
  return (
    <div className={globalStyles.views}>
        <NotificationWrapper>
            <header><h3>Notifications</h3></header>
            <NotificationList>
                <h1>test</h1>

            </NotificationList>
        </NotificationWrapper>
    </div>
  )
}
const NotificationWrapper = styled.section`
    background-color: var(--background-color);
    border-radius: var(--app-border-radius);
    margin: var(--app-margin);
    padding: var(--app-padding);
    height: 98svh;
    display: flex;
    flex-direction: column;
    >header{
        margin: var(--app-margin);
        padding: var(--app-padding);
        border-bottom: 2px solid var(--halfway-color);
    }
`;
const NotificationList = styled.div`
    flex-grow:1;
    overflow-y: scroll;
    margin: var(--app-margin);
    padding: var(--app-padding);
`;
export default Notifications