import React, { useContext, useEffect, useState } from "react";
import globalStyles from "../styles/app.module.css";
import styled from "styled-components";
import { io } from "socket.io-client";
import { UserContext } from "../context/UserContext";
import { API_URL } from "../services/API";
import { getNotifications } from "../services/notifications/getNotifications";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const socket = io(API_URL);

const Notifications = () => {
  const { userState } = useContext(UserContext);
  const { id, token } = userState;

  const [notifications, setNotifications] = useState<any>([]); //promeni tip kasnije
  const fetchNotifications = async () => {
    try {
      const data = await getNotifications(token);
      console.log(data);
      setNotifications(data.notifications);
    } catch (error) {}
  };
  useEffect(() => {
    fetchNotifications();
    socket.emit("joinRoom", { userId: id });
    socket.on("notification", (notification) => {
      setNotifications((prev: any) => [notification,...prev]);
      console.log(notification);
    });

    return () => {
      socket.off("notification");
    };
  }, []);
  return (
    <div className={globalStyles.views}>
      <NotificationWrapper>
        <header>
          <h3>Notifications</h3>
        </header>
        {notifications && notifications.length === 0 ? (
          <p>You have no notifications</p>
        ) : (
          <NotificationList>
            {notifications.map((elem: any, ind: any) => (
              <NotificationListItem key={ind}>
                <p>{elem.content}</p>
                <TimeTag>
                  <AccessTimeIcon />
                  <p>
                    {new Date(elem.createdAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </TimeTag>
              </NotificationListItem>
            ))}
          </NotificationList>
        )}
      </NotificationWrapper>
    </div>
  );
};
const NotificationWrapper = styled.section`
  background-color: var(--background-color);
  border-radius: var(--app-border-radius);
  margin: var(--app-margin);
  padding: var(--app-padding);
  height: 98svh;
  display: flex;
  flex-direction: column;
  > header {
    margin: var(--app-margin);
    padding: var(--app-padding);
    border-bottom: 2px solid var(--halfway-color);
  }
`;
const NotificationList = styled.ul`
  flex-grow: 1;
  overflow-y: scroll;
  margin: var(--app-margin);
  padding: var(--app-padding);
`;
const NotificationListItem = styled.li`
  margin: var(--app-margin);
  padding: var(--app-padding);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid var(--halfway-color);
  border-radius: var(--app-border-radius);
  flex-wrap:wrap;
  list-style: none;
`;
const TimeTag = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  opacity: 0.5;
`;
export default Notifications;
