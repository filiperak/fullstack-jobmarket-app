import { Avatar } from "@mui/material";
import React, { useContext } from "react";
import styles from "../../styles/sidebar.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ISidebar } from "../../interface/props";
import { UserContext } from "../../context/UserContext";

const ProfileAvatar = ({ setModalOpen }: ISidebar) => {
  const { userState } = useContext(UserContext);
  return (
    <div onClick={() => setModalOpen()} className={styles.avatarCntainer}>
      <Avatar>{userState.username && userState.username[0].toUpperCase()}</Avatar>
      {userState.logged ? (
        <div>
          <p>{userState.username}</p>
          <p>{userState.email}</p>
        </div>
      ) : (
        <p>Log in</p>
      )}
      <MoreVertIcon />
    </div>
  );
};

export default ProfileAvatar;
