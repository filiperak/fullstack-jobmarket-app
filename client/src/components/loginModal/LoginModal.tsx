import React, { useState } from "react";
import { ISidebar } from "../../interface/props";
import styles from "../../styles/modal.module.css";

const LoginModal = ({ open, setModalOpen }: ISidebar) => {
  const [register, setRegister] = useState<boolean>(false);

  if (!open) return null;

  const handleToggle = () => {
    setRegister((prev) => !prev);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalOpen();
  };

  return (
    <>
      <div className={styles.overlay} />
      <form className={styles.modal}>
        <h3>{register ? "Please register account" : "Please sign in"}</h3>
        <p>
          {register ? "Already have an account?" : "Don't have an account?"}{" "}
          <span className={styles.signinSpan} onClick={handleToggle}>
            {register ? "Sign In" : "Register"}
          </span>
        </p>
        <input type="text" placeholder="username" />
        {register && <input type="text" placeholder="email" />}
        <input type="password" placeholder="password" />

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
