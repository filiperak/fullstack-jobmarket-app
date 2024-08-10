import React, { useState } from "react";
import { ISidebar } from "../../interface/props";
import styles from "../../styles/modal.module.css";
import { useAuth } from "../../services/users/useAuth";

const LoginModal = ({ open, setModalOpen }: ISidebar) => {
  const [register, setRegister] = useState<boolean>(false);
  const { handleLogin, handleRegister } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  if (!open) return null;

  const handleToggle = () => {
    setRegister((prev) => !prev);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalOpen();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (register) {
      await handleRegister(username, email, password);
    } else {
      await handleLogin(username, password);
    }
    //setModalOpen();
  };

  return (
    <>
      <div className={styles.overlay} />
      <form 
      onSubmit={handleSubmit}
      className={styles.modal}>
        <h3>{register ? "Please register account" : "Please sign in"}</h3>
        <p>
          {register ? "Already have an account?" : "Don't have an account?"}{" "}
          <span className={styles.signinSpan} onClick={handleToggle}>
            {register ? "Sign In" : "Register"}
          </span>
        </p>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {register && (
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className={styles.btnContainer}>
          <button className={styles.cancelBtn} onClick={handleClose}>
            Cancel
          </button>
          <button className={styles.confirmBtn} type="submit">
            {register ? "Register" : "Sign in"}
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginModal;
