import React, { useContext, useEffect, useState } from 'react'
import globalStyles from '../styles/app.module.css'
import styled from 'styled-components'
import { io } from 'socket.io-client'
import { UserContext } from '../context/UserContext'

const socket = io('http://localhost:5000')

const Notifications = () => {
    const {userState} = useContext(UserContext)
    const {id} = userState

    const [notifications,setNotifications] = useState<any>([])  //promeni tip kasnije
    useEffect(() => {

        socket.emit('joinRoom', { userId: id });
        socket.on('notification', (notification) => {
            setNotifications((prev: any) => [...prev, notification]);
            console.log(notification);
        });

        return () => {
            socket.off('notification');
        };
    }, []); 
  return (
    <div className={globalStyles.views}>
        <NotificationWrapper>
            <header><h3>Notifications</h3></header>
                <h1>test</h1>
                {notifications && notifications.length === 0?
                <p>You have no notifications</p>
                :<NotificationList>
                    {notifications.map((elem:any,ind:any) => (
                        <NotificationListItem key={ind}>
                            {elem.content}
                        </NotificationListItem>
                    ))}
                </NotificationList>  
            }

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
const NotificationList = styled.ul`
    flex-grow:1;
    overflow-y: scroll;
    margin: var(--app-margin);
    padding: var(--app-padding);
`;
const NotificationListItem = styled.li`
    border: 1px solid red;
`;
export default Notifications