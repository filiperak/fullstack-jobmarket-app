import React, { useEffect, useState } from "react";
import globalStyles from "../styles/app.module.css";
import styles from "../styles/chats.module.css";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import { IUser } from "../interface/props";
import { getUserByUsername } from "../services/users/getUserByUsername";
import { Avatar } from "@mui/material";
const Chats = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchVal, setSearchVal] = useState<string>("");
  const [iRender,setIrender] = useState<boolean>(true)
  const [receiver,setReceiver] = useState<any>({    //PROMENI TIP IZ ANY U NESTO 
    receiverId:'',
    receiverUsername:'',
    messages:[]
  })
  const toggle = () => {
    setOpen(!open)
  };

  const searchUsers = async (query: string) => {
    try {
      const data = await getUserByUsername(query);
      if (data.error) {
        alert(data.error);
        return;
      } else {
        setUsers(data.users);
      }
    } catch (error) {}
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setSearchVal(newVal);
    if (newVal.length > 0) {
      searchUsers(newVal);
      setIrender(!iRender)
    } else {
      setUsers([]);
    }
  };
  const createConversation = (id:string,username:string) => {
    setReceiver((prevReceiver:any) => ({
      ...prevReceiver,
      receiverId: id,
      receiverUsername: username,
  }));
  }

  return (
    <div className={globalStyles.views}>
      <main className={styles.chatWrapper}>
        <aside className={styles.sidebar}>
          <header>
            <h3>Conversations</h3>
            <div className={globalStyles.confirmBtn} onClick={toggle}>
              <LibraryAddOutlinedIcon />
              <p>New</p>
            </div>
          </header>
          {open ? (
            <div className={styles.newConversation}>
              <input
                type="text"
                placeholder="Search users..."
                value={searchVal}
                onChange={(e) => handleChange(e)}
              />
              <ul>
                {users && users.length > 0 ? (
                  users.map((elem) => (
                    <li key={elem._id} onClick={() => createConversation(elem._id,elem.username)}>
                      <Avatar sx={{ width: 24, height: 24 }}>
                        {elem.username[0].toUpperCase()}
                      </Avatar>
                      <p>@{elem.username}</p>
                    </li>
                  ))
                ) : (
                  <li>{iRender?'Searching...':'No users Found'}</li>
                )}
              </ul>
            </div>
          ) : null}
        </aside>
        <section className={styles.chat}>
          <header>
          {/* <p>{receiver.receiverUsername.length ?{receiver.receiverUsername}: 'Select conversation'}</p> */}
          </header>
          <div className={styles.chatContainer}>
            <p>testes</p>

            <form className={styles.msgInput}>
              <input type="text" placeholder="Message..." />
              <button className={styles.sendBtn} type="submit">
                <ArrowUpwardOutlinedIcon />
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Chats;
