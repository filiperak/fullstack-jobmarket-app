import React, { useContext, useEffect, useState } from "react";
import globalStyles from "../styles/app.module.css";
import styles from "../styles/chats.module.css";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import { IUser } from "../interface/props";
import { getUserByUsername } from "../services/users/getUserByUsername";
import { Avatar } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";
import { createConversation } from "../services/messages/createConversation";
import { getConversations } from "../services/messages/getConversations";
import { formatTime } from "../utility/formatTime";

const Chats = () => {
  const { userState } = useContext(UserContext);
  const { id, token } = userState;
  const { socket } = useContext(SocketContext) ?? { socket: null };
  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchVal, setSearchVal] = useState<string>("");
  const [iRender, setIrender] = useState<boolean>(true);
  const [messageInp, setMessageInp] = useState<string>("");
  const [convo, setConvo] = useState<any>([]);
  const [currentConvo,setCurrentConvo] = useState<any>(null)
  const [otherUser,setOtherUser] = useState<any>(null)  

  const toggle = () => {
    setOpen(!open);
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
      setIrender(!iRender);
    } else {
      setUsers([]);
    }
  };
  const createNewConversation = async (id: string) => {
    const existingConvoIndex = convo.findIndex((conversation: any) =>
      conversation.participants.some(
        (participant: { _id: string }) => participant._id === id
      )
    );
  
    if (existingConvoIndex !== -1) {
      handleConvoChange(existingConvoIndex);
      toggle(); 
      setSearchVal('');
      return; 
    }
    try {
      const result = await createConversation(token, id);
      if (result && result.error) {
        console.log(result.error);
      } else {

        getMyConversations();
        handleConvoChange(0);
        toggle();
        setSearchVal('');
        
      }
    } catch (error) {}
  };
  const getMyConversations = async () => {
    try {
      const result = await getConversations(token);
      console.log(result.conversations);
      setConvo(result.conversations);
    } catch (error) {}
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    //socket logic
    socket.emit("sendMessage", {
      senderId: id,
      receiverId: otherUser._id,
      content: messageInp,
      conversationId:currentConvo._id,
    });
    setMessageInp("");
  };


  useEffect(() => {
    getMyConversations();
    if (socket) {
      socket.emit("joinRoom", { userId: id });
      socket.on("receiveMessage", (message: any) => {
        setCurrentConvo((prev:any) => ({
          ...prev,messages:[message,...prev.messages]
        }))
      });

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [socket, id]);

  useEffect(() => {
    if (convo.length > 0) {
      handleConvoChange(0); 
    }
  }, [convo]);

  const handleConvoChange = (ind: number) => {
    const selectedConvo = convo[ind];
    if (selectedConvo) {
      setCurrentConvo(selectedConvo);
      const otherParticipant = selectedConvo.participants.find(
        (participant: { _id: string }) => participant._id !== id
      );
      setOtherUser(otherParticipant);
    }
  };
  
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
                    <li
                      key={elem._id}
                      onClick={() =>
                        createNewConversation(elem._id)
                      }
                    >
                      <Avatar sx={{ width: 24, height: 24 }} variant="rounded">
                        {elem.username[0].toUpperCase()}
                      </Avatar>
                      <p>@{elem.username}</p>
                    </li>
                  ))
                ) : (
                  <li>{iRender ? "Users..." : "No users Found"}</li>
                )}
              </ul>
            </div>
          ) : null}
          <ul className={styles.convoUl}>
            {convo && convo.length >0 ? (
              convo.map((elem: any,ind:number) => {
                const otherParticipant = elem.participants.find(
                  (participant: { _id: string; username: string }) =>
                    participant._id !== id
                );

                return (
                  <li key={ind} onClick={() => handleConvoChange(ind)} className={otherParticipant?.username === otherUser?.username ? styles.active : ''}>
                    <Avatar variant="rounded">
                      {otherParticipant?.username[0].toUpperCase()}
                    </Avatar>
                    <div className={styles.liUsername}>
                      <p>{otherParticipant?.username}</p>
                      <p>
                        {elem.messages && elem.messages[0] && elem.messages[0].content
                          ? elem.messages[0].content.length > 20 
                            ? elem.messages[0].content.slice(0, 15) + '...' 
                            : elem.messages[0].content
                          : ''} 
                      </p>

                    </div>
                    <span>
                      {formatTime(elem.updatedAt)}
                    </span>
                  </li>
                );
              })
            ) : (
              <p>No Conversations yet</p>
            )}
          </ul>
        </aside>
        <section className={styles.chat}>
          <header>
          <p>
          {currentConvo ? (
            currentConvo.participants.find(
              (participant: { _id: string }) => participant._id !== id
            )?.username || "No user"
          ) : (
            "Select conversation"
          )}
        </p>
          </header>
          <div className={styles.chatContainer}>
            {currentConvo && currentConvo.messages.length ?
            currentConvo.messages.map((elem:any) => (
              <p className={elem.sender === id? styles.senderMsg : styles.recieverMsg}>
                <p>{elem.content}</p>
                <p>{formatTime(elem.createdAt)}</p>
              </p>
            ))
            :null}

            <form className={styles.msgInput} onSubmit={(e) => sendMessage(e)}>
              <input
                type="text"
                placeholder="Message..."
                value={messageInp}
                onChange={(e) => setMessageInp(e.target.value)}
              />
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
