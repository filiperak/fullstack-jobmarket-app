import React, { useContext, useEffect, useState } from "react";
import globalStyles from "../styles/app.module.css";
import styles from "../styles/chats.module.css";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import { IUser } from "../interface/props";
import { getUserByUsername } from "../services/users/getUserByUsername";
import { Avatar } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";
import { createConversation } from "../services/messages/createConversation";
import { getConversations } from "../services/messages/getConversations";

const Chats = () => {
  const { userState } = useContext(UserContext);
  const { id, token } = userState;
  const { socket } = useContext(SocketContext) ?? { socket: null };
  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchVal, setSearchVal] = useState<string>("");
  const [iRender, setIrender] = useState<boolean>(true);
  const [receiver, setReceiver] = useState<any>({
    //PROMENI TIP IZ ANY U NESTO
    receiverId: "",
    receiverUsername: "",
    messages: [],
  });
  const [messageInp, setMessageInp] = useState<string>("");
  const [convo, setConvo] = useState<any>([]);

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
  const createNewConversation = async (id: string, username: string) => {
    try {
      console.log(id);

      const result = await createConversation(token, id);
      if (result && result.error) {
        console.log(result.error);
      } else {
        console.log(result.conversation);
      }
    } catch (error) {}
    setReceiver((prevReceiver: any) => ({
      ...prevReceiver,
      receiverId: id,
      receiverUsername: username,
    }));
    //get conversations wheree userid is reciever or sender
  };
  const getMyConversations = async () => {
    try {
      const result = await getConversations(token);
      console.log(result.conversations);
      setConvo(result.conversations);
    } catch (error) {}
  };
  // useEffect(() => {
  //   socket.emit("joinRoom",{userId:id})

  // },[])
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    //socket logic
    //socket.emit("joinRoom",{userId:id})
    socket.emit("sendMessage", {
      senderId: id,
      receiverId: receiver.receiverId,
      content: messageInp,
    });
    setMessageInp("");
  };

  // socket.on('receiveMessage',(message:any) => {
  //   console.log(message);
  // })
  useEffect(() => {
    getMyConversations();
    if (socket) {
      socket.emit("joinRoom", { userId: id });

      socket.on("receiveMessage", (message: any) => console.log(message));

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [socket, id]);

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
                        createNewConversation(elem._id, elem.username)
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
            {convo && convo.length ? (
              convo.map((elem: any) => {
                const otherParticipant = elem.participants.find(
                  (participant: { _id: string; username: string }) =>
                    participant._id !== id
                );

                return (
                  <li key={elem._id}>
                    <Avatar variant="rounded">
                      {otherParticipant?.username[0].toUpperCase()}
                    </Avatar>
                    <div className={styles.liUsername}>
                      <p>{otherParticipant?.username}</p>
                    </div>
                    <p>
                      {new Date(elem.updatedAt).toLocaleDateString("en-GB")}
                    </p>
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
              {receiver.receiverUsername.length
                ? receiver.receiverUsername
                : "Select conversation"}
            </p>
          </header>
          <div className={styles.chatContainer}>
            <p>testes</p>

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
